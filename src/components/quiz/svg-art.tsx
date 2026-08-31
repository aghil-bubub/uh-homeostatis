export function NeuronDiagram({
  selected,
  onSelect,
}: {
  selected?: string;
  onSelect: (id: string) => void;
}) {
  const stroke = (id: string) =>
    selected === id ? "var(--foreground)" : "transparent";

  const hotspot = (id: string, cx: number, cy: number, rx: number, ry: number) => (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill="transparent"
      stroke={selected === id ? "var(--foreground)" : "var(--primary)"}
      strokeWidth="2.5"
      strokeDasharray="6 5"
      opacity={selected === id ? 1 : 0.35}
      className="pointer-events-none"
    />
  );

  return (
    <div className="space-y-3">
      <svg
        viewBox="0 0 640 240"
        className="w-full rounded-2xl bg-secondary/50 p-2"
        role="img"
        aria-label="Diagram sel saraf (neuron)"
      >
        {/* Dendrit */}
        <g
          onClick={() => onSelect("dendrit")}
          className="cursor-pointer"
          aria-label="Dendrit"
        >
          <path
            d="M120 120 L60 70 M120 120 L50 120 M120 120 L60 175 M120 120 L95 60 M120 120 L95 182"
            stroke="var(--chart-2)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="85" cy="120" r="52" fill="transparent" stroke={stroke("dendrit")} strokeWidth="3" strokeDasharray="6 5" />
        </g>

        {/* Badan sel + nukleus */}
        <g onClick={() => onSelect("badan-sel")} className="cursor-pointer" aria-label="Badan sel">
          <circle cx="150" cy="120" r="42" fill="var(--primary)" opacity="0.9" />
          <circle cx="150" cy="120" r="16" fill="var(--background)" opacity="0.85" />
          <circle cx="150" cy="120" r="46" fill="transparent" stroke={stroke("badan-sel")} strokeWidth="3" strokeDasharray="6 5" />
        </g>

        {/* Akson */}
        <g onClick={() => onSelect("akson")} className="cursor-pointer" aria-label="Akson">
          <rect x="192" y="110" width="330" height="20" rx="10" fill="var(--chart-2)" opacity="0.55" />
          <rect x="192" y="104" width="330" height="32" rx="16" fill="transparent" stroke={stroke("akson")} strokeWidth="3" strokeDasharray="6 5" />
        </g>

        {/* Selubung mielin */}
        <g onClick={() => onSelect("mielin")} className="cursor-pointer" aria-label="Selubung mielin">
          {[210, 290, 370, 450].map((x) => (
            <ellipse key={x} cx={x + 28} cy="120" rx="32" ry="26" fill="var(--chart-4)" opacity="0.95" />
          ))}
          <rect x="170" y="86" width="360" height="68" rx="24" fill="transparent" stroke={stroke("mielin")} strokeWidth="3" strokeDasharray="6 5" />
        </g>

        {/* Terminal akson */}
        <g onClick={() => onSelect("terminal")} className="cursor-pointer" aria-label="Terminal akson">
          <path
            d="M522 120 L590 80 M522 120 L600 120 M522 120 L590 162"
            stroke="var(--success)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          {[
            [592, 80],
            [602, 120],
            [592, 162],
          ].map(([cx, cy]) => (
            <circle key={cx + "-" + cy} cx={cx} cy={cy} r="9" fill="var(--success)" />
          ))}
          <circle cx="570" cy="120" r="48" fill="transparent" stroke={stroke("terminal")} strokeWidth="3" strokeDasharray="6 5" />
        </g>
      </svg>

      <div className="flex flex-wrap gap-2">
        {parts.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              selected === p.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-secondary"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ThermoIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" role="img" aria-label="Ikon termometer">
      <rect x="26" y="8" width="12" height="34" rx="6" fill="var(--chart-5)" opacity="0.25" />
      <rect x="29" y="16" width="6" height="26" rx="3" fill="var(--chart-5)" />
      <circle cx="32" cy="48" r="11" fill="var(--chart-5)" />
      <path d="M46 20h8M46 28h6M46 36h8" stroke="var(--muted-foreground)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function BrainIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" role="img" aria-label="Ikon otak">
      <path
        d="M26 12c-7 0-12 5-12 11 0 2-3 4-3 8s3 5 3 8c0 6 5 11 12 11h12c8 0 14-6 14-14V26c0-8-6-14-14-14z"
        fill="var(--primary)"
        opacity="0.9"
      />
      <path
        d="M32 14v36M24 22c4 2 4 6 0 8M42 24c-4 2-4 6 0 8M26 40c4-2 8 0 10 4"
        stroke="var(--primary-foreground)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function MedalIcon({ className = "h-24 w-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Lencana Homeostasis Master">
      <path d="M36 8h16l14 30H50z" fill="var(--chart-2)" />
      <path d="M84 8H68L54 38h16z" fill="var(--primary)" />
      <circle cx="60" cy="74" r="36" fill="var(--chart-4)" />
      <circle cx="60" cy="74" r="28" fill="var(--background)" opacity="0.9" />
      <path
        d="M46 74l9 9 19-19"
        stroke="var(--success)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function DnaIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" role="img" aria-label="Ikon DNA">
      <path
        d="M16 4c0 12 16 16 16 28M32 4c0 12-16 16-16 28M16 44c0-4 16-4 16-8"
        stroke="var(--primary-foreground)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M17 14h14M15 22h18M17 30h14" stroke="var(--primary-foreground)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
