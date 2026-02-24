import { useMemo } from "react";

const COLORS = ["#6dd400", "#c0533a", "#f5c842", "#e8435a", "#45b7d1", "#f09", "#ff6b35"];
const PIECE_COUNT = 60;

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: PIECE_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 4,
        size: 6 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        drift: -50 + Math.random() * 100,
      })),
    []
  );

  return (
    <div className="confetti">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--drift": `${p.drift}px`,
            "--rotation": `${p.rotation}deg`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default Confetti;
