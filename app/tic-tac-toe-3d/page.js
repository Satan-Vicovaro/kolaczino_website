"use client";
import dynamic from "next/dynamic";

const TTTGame3D = dynamic(
  () => import("@/components/tic-tac-toe-3d/TTTGame3D"),
  { ssr: false }
);

export default function Game3D() {
  return <TTTGame3D />;
}
