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

  const regionClass =
    "cursor-pointer transition-opacity hover:opacity-80 focus:outline-none";

  return (
    <div className="space-y-3">
      <svg
        viewBox="0 0 640 240"
        className="w-full rounded-2xl bg-secondary/50 p-2"
        role="img"
        aria-label="Diagram sel saraf (neuron) dengan area klik interaktif"
      >
        {/* Dendrit */}
        <g
          onClick={() => onSelect("dendrit")}
          className={regionClass}
          role="button"
          aria-label="Klik area Dendrit"
        >
          <path
            d="M120 120 L60 70 M120 120 L50 120 M120 120 L60 175 M120 120 L95 60 M120 120 L95 182"
            stroke="var(--chart-2)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          {hotspot("dendrit", 85, 120, 52, 52)}
          {/* area klik transparan */}
          <circle cx="85" cy="120" r="52" fill="transparent" />
        </g>

        {/* Badan sel + nukleus */}
        <g
          onClick={() => onSelect("badan-sel")}
          className={regionClass}
          role="button"
          aria-label="Klik area Badan Sel"
        >
          <circle cx="150" cy="120" r="42" fill="var(--primary)" opacity="0.9" />
          <circle cx="150" cy="120" r="16" fill="var(--background)" opacity="0.85" />
          {hotspot("badan-sel", 150, 120, 46, 46)}
        </g>

        {/* Akson */}
        <g
          onClick={() => onSelect("akson")}
          className={regionClass}
          role="button"
          aria-label="Klik area Akson"
        >
          <rect x="192" y="110" width="330" height="20" rx="10" fill="var(--chart-2)" opacity="0.55" />
          {hotspot("akson", 357, 190, 175, 26)}
          <rect x="182" y="164" width="350" height="52" fill="transparent" />
        </g>

        {/* Selubung mielin */}
        <g
          onClick={() => onSelect("mielin")}
          className={regionClass}
          role="button"
          aria-label="Klik area Selubung Mielin"
        >
          {[210, 290, 370, 450].map((x) => (
            <ellipse key={x} cx={x + 28} cy="120" rx="32" ry="26" fill="var(--chart-4)" opacity="0.95" />
          ))}
          {hotspot("mielin", 350, 120, 180, 34)}
        </g>

        {/* Terminal akson */}
        <g
          onClick={() => onSelect("terminal")}
          className={regionClass}
          role="button"
          aria-label="Klik area Terminal Akson"
        >
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
          {hotspot("terminal", 570, 120, 48, 48)}
        </g>
      </svg>

      <p className="text-center text-xs text-muted-foreground">
        Klik langsung pada bagian sel saraf di gambar (dendrit, badan sel, akson, selubung mielin,
        atau terminal akson).
      </p>
      {selected && (
        <p className="animate-pop-in text-center text-sm font-semibold text-primary">
          Kamu memilih area: {labelOf(selected)}
        </p>
      )}
    </div>
  );
}

const PART_LABELS: Record<string, string> = {
  dendrit: "Dendrit",
  "badan-sel": "Badan Sel",
  akson: "Akson",
  mielin: "Selubung Mielin",
  terminal: "Terminal Akson",
};

function labelOf(id: string) {
  return PART_LABELS[id] ?? id;
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
