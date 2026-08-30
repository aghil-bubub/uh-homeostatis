const COLORS = [
  "var(--primary)",
  "var(--accent)",
  "var(--success)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function Confetti({ count = 90 }: { count?: number }) {
  const pieces = Array.from({ length: count }, (_, i) => {
    const left = (i * 97) % 100;
    const delay = ((i * 37) % 30) / 10;
    const duration = 3 + ((i * 13) % 25) / 10;
    const drift = (((i * 53) % 200) - 100) + "px";
    const size = 6 + ((i * 7) % 8);
    return { i, left, delay, duration, drift, size, color: COLORS[i % COLORS.length] };
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.i}
          className="absolute top-0 block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.6,
            borderRadius: p.i % 3 === 0 ? "9999px" : "2px",
            background: p.color,
            ["--drift" as string]: p.drift,
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
