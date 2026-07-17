"use client";
import React, { useState, useCallback, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line, Edges } from "@react-three/drei";
import { Container } from "@radix-ui/themes";
import * as THREE from "three";
import "./TTTGame3D.css";

// ── Win detection ──
const WINNING_LINES = (() => {
  const lines = [];
  const S = 3;
  // Rows, columns, pillars
  for (let a = 0; a < S; a++) {
    for (let b = 0; b < S; b++) {
      lines.push([[a, b, 0], [a, b, 1], [a, b, 2]]); // z-axis
      lines.push([[a, 0, b], [a, 1, b], [a, 2, b]]); // y-axis
      lines.push([[0, a, b], [1, a, b], [2, a, b]]); // x-axis
    }
  }
  // Face diagonals (6 faces x 2 diags)
  for (let a = 0; a < S; a++) {
    lines.push([[a, 0, 0], [a, 1, 1], [a, 2, 2]]);
    lines.push([[a, 0, 2], [a, 1, 1], [a, 2, 0]]);
    lines.push([[0, a, 0], [1, a, 1], [2, a, 2]]);
    lines.push([[0, a, 2], [1, a, 1], [2, a, 0]]);
    lines.push([[0, 0, a], [1, 1, a], [2, 2, a]]);
    lines.push([[0, 2, a], [1, 1, a], [2, 0, a]]);
  }
  // Space diagonals (4)
  lines.push([[0, 0, 0], [1, 1, 1], [2, 2, 2]]);
  lines.push([[0, 0, 2], [1, 1, 1], [2, 2, 0]]);
  lines.push([[0, 2, 0], [1, 1, 1], [2, 0, 2]]);
  lines.push([[2, 0, 0], [1, 1, 1], [0, 2, 2]]);
  return lines;
})();

function checkWinner(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const va = board[a[0]][a[1]][a[2]];
    const vb = board[b[0]][b[1]][b[2]];
    const vc = board[c[0]][c[1]][c[2]];
    if (va && va === vb && va === vc) {
      return { winner: va, line };
    }
  }
  return null;
}

function isBoardFull(board) {
  for (let x = 0; x < 3; x++)
    for (let y = 0; y < 3; y++)
      for (let z = 0; z < 3; z++)
        if (!board[x][y][z]) return false;
  return true;
}

// ── 3D Cell ──
function Cell({ position, value, onClick, isWinning, opacity, disabled }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  const color = useMemo(() => {
    if (isWinning) return "#ff9500";
    if (value === "X") return "#e06040";
    if (value === "O") return "#4090e0";
    if (hovered && !disabled) return "#555555";
    return "#333333";
  }, [value, isWinning, hovered, disabled]);

  const scale = isWinning ? 1.1 : hovered && !value && !disabled ? 1.05 : 1;

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = !value && !disabled ? "pointer" : "default";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "default";
        }}
        scale={scale}
      >
        <boxGeometry args={[0.85, 0.85, 0.85]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={value ? Math.min(opacity + 0.2, 1) : opacity * 0.5}
          roughness={0.4}
          metalness={0.1}
        />
        <Edges color={isWinning ? "#ffcc00" : "#666666"} lineWidth={isWinning ? 2 : 1} />
      </mesh>
      {value && (
        <Text
          fontSize={0.45}
          color="white"
          anchorX="center"
          anchorY="middle"
          fontWeight={700}
          outlineWidth={0.02}
          outlineColor="black"
        >
          {value}
        </Text>
      )}
    </group>
  );
}

// ── Winning line rendered in 3D ──
function WinningLine3D({ line }) {
  if (!line) return null;
  const points = line.map(([x, y, z]) => [x - 1, y - 1, z - 1]);
  // Extend slightly beyond endpoints
  const start = points[0];
  const end = points[2];
  const dir = [end[0] - start[0], end[1] - start[1], end[2] - start[2]];
  const ext = 0.3;
  const p1 = [start[0] - dir[0] * ext, start[1] - dir[1] * ext, start[2] - dir[2] * ext];
  const p2 = [end[0] + dir[0] * ext, end[1] + dir[1] * ext, end[2] + dir[2] * ext];
  return (
    <Line
      points={[p1, p2]}
      color="#ffcc00"
      lineWidth={4}
      dashed={false}
    />
  );
}

// ── Grid frame ──
function GridFrame() {
  const s = 1.5;
  const lines = [];
  // outer cube edges
  const corners = [
    [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
    [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
  ];
  const edges = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7],
  ];
  return (
    <group>
      {edges.map((e, i) => (
        <Line
          key={i}
          points={[corners[e[0]], corners[e[1]]]}
          color="#444444"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  );
}

// ── Layer labels ──
function LayerLabels() {
  const labels = ["Bottom", "Middle", "Top"];
  return (
    <group>
      {labels.map((label, i) => (
        <Text
          key={i}
          position={[-2.2, i - 1, 0]}
          fontSize={0.2}
          color="#888888"
          anchorX="right"
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

// ── Main component ──
export default function TTTGame3D() {
  const emptyBoard = () =>
    Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => Array(3).fill(null))
    );

  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [opacity, setOpacity] = useState(0.6);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  const result = useMemo(() => checkWinner(board), [board]);
  const full = useMemo(() => isBoardFull(board), [board]);

  const winningCells = useMemo(() => {
    if (!result) return new Set();
    return new Set(result.line.map(([x, y, z]) => `${x},${y},${z}`));
  }, [result]);

  const handleClick = useCallback(
    (x, y, z) => {
      if (result || board[x][y][z]) return;
      const newBoard = board.map((layer) => layer.map((row) => [...row]));
      newBoard[x][y][z] = xIsNext ? "X" : "O";
      setBoard(newBoard);
      setXIsNext(!xIsNext);

      const newResult = checkWinner(newBoard);
      if (newResult) {
        if (newResult.winner === "X") setScoreX((s) => s + 1);
        else setScoreO((s) => s + 1);
      }
    },
    [board, xIsNext, result]
  );

  const handleReset = () => {
    setBoard(emptyBoard());
    setXIsNext(true);
  };

  const status = result
    ? `${result.winner} wins!`
    : full
    ? "Draw!"
    : `Next: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="hero-gradient ttt3d-container">
      <Container size="3" className="px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1
            className="text-3xl md:text-5xl font-bold tracking-tight mb-2"
            style={{
              background: "linear-gradient(135deg, var(--orange-9), var(--orange-11))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            3D Tic-Tac-Toe
          </h1>
          <p className="text-sm" style={{ color: "var(--gray-9)" }}>
            Experimental &mdash; 3x3x3 cube. Rotate, zoom, and click cells to play.
          </p>
        </div>

        {/* Score + Status */}
        <div className="flex flex-wrap gap-3 justify-center mb-4">
          <div className="ttt3d-score-card">
            <div className="ttt3d-score-item">
              <div className="label">Player X</div>
              <div className="value" style={{ color: "#e06040" }}>{scoreX}</div>
            </div>
            <div className="ttt3d-score-item">
              <div className="label">Player O</div>
              <div className="value" style={{ color: "#4090e0" }}>{scoreO}</div>
            </div>
          </div>
          <div className={`ttt3d-status ${result ? "winner" : ""}`}>{status}</div>
        </div>

        {/* Controls */}
        <div className="ttt3d-controls mb-4">
          <div className="ttt3d-slider-group">
            <label>Transparency</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
            />
            <span style={{ color: "var(--gray-10)", fontSize: 13, minWidth: 32 }}>
              {Math.round(opacity * 100)}%
            </span>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{
              background: "var(--orange-9)",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            New Game
          </button>
        </div>

        {/* 3D Canvas */}
        <div className="ttt3d-canvas-wrapper">
          <Canvas
            camera={{ position: [4, 3, 4], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <color attach="background" args={["#111111"]} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <directionalLight position={[-3, -3, 2]} intensity={0.3} />

            <GridFrame />
            <LayerLabels />

            {board.map((layer, x) =>
              layer.map((row, y) =>
                row.map((val, z) => (
                  <Cell
                    key={`${x}-${y}-${z}`}
                    position={[x - 1, y - 1, z - 1]}
                    value={val}
                    onClick={() => handleClick(x, y, z)}
                    isWinning={winningCells.has(`${x},${y},${z}`)}
                    opacity={opacity}
                    disabled={!!result}
                  />
                ))
              )
            )}

            {result && <WinningLine3D line={result.line} />}

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={15}
              makeDefault
            />
          </Canvas>
        </div>

        {/* Legend */}
        <div className="text-center mt-4" style={{ color: "var(--gray-8)", fontSize: 13 }}>
          Left-click drag to rotate &bull; Scroll to zoom &bull; Right-click drag to pan
        </div>
      </Container>
    </div>
  );
}
