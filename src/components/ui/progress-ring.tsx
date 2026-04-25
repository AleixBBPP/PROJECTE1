interface ProgressRingProps {
  progress: number;
}

export function ProgressRing({ progress }: ProgressRingProps) {
  const radius = 34;
  const stroke = 6;
  const normalized = Math.min(100, Math.max(0, progress));
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalized / 100) * circumference;

  return (
    <svg width="84" height="84" className="-rotate-90">
      <circle cx="42" cy="42" r={radius} stroke="rgba(255,255,255,0.15)" strokeWidth={stroke} fill="none" />
      <circle
        cx="42"
        cy="42"
        r={radius}
        stroke="#7c5cff"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}
