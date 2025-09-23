"use client";
import { useRef, useState, useEffect } from "react";
import InfoCard from "@/components/infoCards/InfoCard";

export default function CountdownClock({ duration = 60000 }) {
  const [remaining, setRemaining] = useState(() => duration);
  const endTimeRef = useRef(Date.now() + duration);
  const intervalRef = useRef(null);

  useEffect(() => {
    endTimeRef.current = Date.now() + duration;

    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, endTimeRef.current - now);
      setRemaining(diff);

      if (diff <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    tick();
    intervalRef.current = setInterval(tick, 250);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [duration]);

  const pad = (num) => num.toString().padStart(2, "0");

  const totalSeconds = Math.ceil(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <InfoCard>
      <div className="time">
        <span className="clock">{pad(hours)}:</span>
        <span className="clock">{pad(minutes)}:</span>
        <span className="secs">{pad(seconds)}</span>
      </div>
    </InfoCard>
  );
}
