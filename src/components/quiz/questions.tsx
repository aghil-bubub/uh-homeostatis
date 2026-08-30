import { useMemo, useState } from "react";
import { Check, GripVertical, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { NeuronDiagram, ThermoIcon } from "./svg-art";

export type Answers = {
  q1: string[];
  q2: string;
  q3: Record<"a" | "b" | "c", boolean | null>;
  q4: Record<string, string>;
  q5: number | null;
  q6: string;
  q7: string;
  q8: string;
  q9: string[];
  q10: string;
};

export const emptyAnswers: Answers = {
  q1: [],
  q2: "",
  q3: { a: null, b: null, c: null },
  q4: {},
  q5: null,
  q6: "",
  q7: "",
  q8: "",
  q9: [],
  q10: "",
};

export const TOTAL_QUESTIONS = 10;

/* ---------------- data ---------------- */

const REFLEX_STEPS = [
  { id: "s1", label: "Rangsangan Panas" },
  { id: "s2", label: "Reseptor Kulit" },
  { id: "s3", label: "Saraf Sensorik" },
  { id: "s4", label: "Sumsum Tulang Belakang" },
  { id: "s5", label: "Saraf Motorik" },
  { id: "s6", label: "Efektor Otot Lengan" },
];
const REFLEX_ORDER = ["s1", "s2", "s3", "s4", "s5", "s6"];
const SHUFFLED_STEPS = ["s3", "s6", "s1", "s5", "s2", "s4"];

const MATCH_LEFT = [
  { id: "pankreas", label: "Pankreas" },
  { id: "adrenal", label: "Kelenjar Adrenal" },
  { id: "sumsum", label: "Sumsum Tulang Belakang" },
];
const MATCH_RIGHT = [
  { id: "adrenalin", label: "Menghasilkan Adrenalin saat kaget / stres" },
  { id: "refleks", label: "Pusat pembalik sinyal gerak refleks" },
  { id: "insulin", label: "Menghasilkan Insulin untuk mengatur gula darah" },
];
const MATCH_KEY: Record<string, string> = {
  pankreas: "insulin",
  adrenal: "adrenalin",
  sumsum: "refleks",
};

const SLIDER_OPTIONS = [
  "Menggigil & Pembuluh Darah Menyempit",
  "Mengeluarkan Keringat & Pembuluh Darah Melebar",
  "Berhenti Bernapas Sejenak & Otot Mengejang",
];

const HOMEOSTASIS_CARDS = [
  {
    id: "a",
    title: "Kartu A",
    text: "Tubuh mengeluarkan keringat saat kepanasan agar suhu tubuh kembali stabil di 37°C.",
  },
  {
    id: "b",
    title: "Kartu B",
    text: "Tinggi badan seorang siswa bertambah 5 cm selama satu tahun karena pertumbuhan.",
  },
  {
    id: "c",
    title: "Kartu C",
    text: "Daun putri malu menutup dengan cepat ketika permukaannya disentuh oleh tangan.",
  },
];

const BOBA_CARDS = [
  {
    id: "a",
    text: "Organ Pankreas merespons dengan mengeluarkan hormon Insulin untuk menyerap glukosa darah agar kembali normal.",
  },
  {
    id: "b",
    text: "Organ Ginjal langsung menambah produksi hormon Adrenalin supaya gula darah naik lebih tinggi lagi.",
  },
  {
    id: "c",
    text: "Otak Besar menahan aliran darah ke lambung sehingga gula tidak pernah masuk ke pembuluh darah.",
  },
];

const MC8 = [
  {
    id: "a",
    text: "Agar respons gerakan terjadi sangat cepat (spontan) untuk mencegah kerusakan jaringan tubuh yang lebih parah.",
  },
  { id: "b", text: "Karena Otak Besar hanya bekerja pada saat kita sedang tertidur pulas." },
  { id: "c", text: "Karena sinyal listrik tidak dapat merambat sampai ke bagian kepala." },
  { id: "d", text: "Karena Sumsum Tulang Belakang menyimpan lebih banyak hormon daripada otak." },
];

const MULTI9 = [
  { id: "cepat", text: "Bekerja sangat cepat dalam hitungan milidetik" },
  { id: "listrik", text: "Menggunakan sinyal listrik (impuls) melalui serabut saraf" },
  { id: "darah", text: "Mengirim zat kimia perlahan melalui pembuluh darah" },
  { id: "lama", text: "Responsnya berlangsung sangat lambat dan bertahan lama" },
];

export const RECAP = [
  {
    title: "Alur Gerak Refleks",
    text: "Rangsangan → Reseptor → Saraf Sensorik → Sumsum Tulang Belakang → Saraf Motorik → Efektor. Jalur pendek ini membuat respons spontan dan melindungi tubuh.",
  },
  {
    title: "Sel Saraf (Neuron)",
    text: "Selubung mielin membungkus akson sebagai isolator, sehingga impuls listrik melompat dan merambat jauh lebih cepat.",
  },
  {
    title: "Saraf vs Hormon",
    text: "Saraf: sinyal listrik, sangat cepat, efek singkat. Hormon: zat kimia lewat darah, lebih lambat, efek bertahan lama.",
  },
  {
    title: "Termoregulasi",
    text: "Saat kepanasan, hipotalamus memerintahkan keringat keluar dan pembuluh darah melebar agar panas terbuang dan suhu kembali 37°C.",
  },
  {
    title: "Gula Darah & Insulin",
    text: "Saat glukosa melonjak, pankreas melepas insulin agar glukosa diserap sel dan kadar gula darah kembali normal.",
  },
  {
    title: "Homeostasis",
    text: "Kemampuan tubuh menjaga kondisi internal (suhu, gula darah, cairan) tetap stabil meski lingkungan luar berubah.",
  },
];

/* ---------------- scoring ---------------- */

export function isQuestionAnswered(index: number, a: Answers): boolean {
  switch (index) {
    case 0:
      return a.q1.length === 6;
    case 1:
      return !!a.q2;
    case 2:
      return a.q3.a !== null && a.q3.b !== null && a.q3.c !== null;
    case 3:
      return Object.keys(a.q4).length === 3;
    case 4:
      return a.q5 !== null;
    case 5:
      return !!a.q6;
    case 6:
      return !!a.q7;
    case 7:
      return !!a.q8;
    case 8:
      return a.q9.length === 2;
    case 9:
      return a.q10.trim().length >= 3;
    default:
      return false;
  }
}

export function computeScore(a: Answers): number {
  let correct = 0;
  if (a.q1.join(",") === REFLEX_ORDER.join(",")) correct++;
  if (a.q2 === "mielin") correct++;
  if (a.q3.a === true && a.q3.b === true && a.q3.c === false) correct++;
  if (MATCH_LEFT.every((l) => a.q4[l.id] === MATCH_KEY[l.id])) correct++;
  if (a.q5 === 1) correct++;
  if (a.q6 === "a") correct++;
  if (a.q7 === "a") correct++;
  if (a.q8 === "a") correct++;
  if (a.q9.length === 2 && a.q9.includes("cepat") && a.q9.includes("listrik")) correct++;
  if (a.q10.trim().length >= 3) correct++;
  return Math.round((correct / TOTAL_QUESTIONS) * 100);
}

/* ---------------- shared bits ---------------- */

function Narrative({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-l-4 border-accent bg-secondary/60 p-4 text-sm leading-relaxed text-secondary-foreground">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-accent">
        Narasi Kasus
      </span>
      {children}
    </div>
  );
}

function Instruction({ children }: { children: React.ReactNode }) {
  return <p className="text-base font-semibold text-foreground">{children}</p>;
}

function OptionCard({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border-2 p-4 text-left text-sm leading-relaxed transition-all ${
        active
          ? "border-primary bg-primary/10 font-semibold text-foreground shadow-[var(--shadow-glow)]"
          : "border-border bg-card text-muted-foreground hover:border-accent hover:bg-secondary/60"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------------- questions ---------------- */

function Q1({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [dragged, setDragged] = useState<string | null>(null);
  const pool = SHUFFLED_STEPS.filter((id) => !value.includes(id));
  const label = (id: string) => REFLEX_STEPS.find((s) => s.id === id)!.label;

  const add = (id: string) => onChange([...value, id]);
  const remove = (id: string) => onChange(value.filter((v) => v !== id));

  return (
    <div className="space-y-4">
      <Narrative>
        Saat belajar kelompok, Budi tidak sengaja menyenggol cangkir kopi yang sangat panas. Secara
        spontan, tangan Budi langsung ditarik mundur sebelum ia sempat berpikir!
      </Narrative>
      <Instruction>
        Urutkan 6 langkah alur gerak refleks yang terjadi pada tubuh Budi dari awal sampai akhir!
      </Instruction>
      <p className="text-xs text-muted-foreground">
        Seret kartu ke kotak urutan, atau cukup ketuk kartunya.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Kartu Langkah
          </span>
          <div className="min-h-24 space-y-2 rounded-2xl border border-dashed border-border bg-secondary/40 p-3">
            {pool.length === 0 && (
              <p className="p-2 text-xs text-muted-foreground">Semua kartu sudah tersusun.</p>
            )}
            {pool.map((id) => (
              <div
                key={id}
                draggable
                onDragStart={() => setDragged(id)}
                onClick={() => add(id)}
                className="flex cursor-grab items-center gap-2 rounded-xl border border-border bg-card p-3 text-sm font-medium shadow-sm active:cursor-grabbing"
              >
                <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
                {label(id)}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Urutan Alur Refleks
          </span>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragged && !value.includes(dragged)) add(dragged);
              setDragged(null);
            }}
            className="min-h-24 space-y-2 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 p-3"
          >
            {value.length === 0 && (
              <p className="p-2 text-xs text-muted-foreground">Letakkan kartu pertama di sini…</p>
            )}
            {value.map((id, i) => (
              <div
                key={id}
                onClick={() => remove(id)}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-primary/30 bg-card p-3 text-sm font-semibold"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs text-primary-foreground">
                  {i + 1}
                </span>
                <span className="min-w-0">{label(id)}</span>
              </div>
            ))}
          </div>
          {value.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => onChange([])}>
              <RotateCcw className="mr-1 h-4 w-4" /> Atur ulang
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Q2({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-4">
      <Narrative>
        Agar sinyal refleks pada tangan Budi tadi bisa merambat sangat cepat, serabut akson dilapisi
        oleh jaringan berlemak yang berperan sebagai isolator listrik.
      </Narrative>
      <Instruction>
        Klik pada bagian Selubung Mielin yang membungkus akson untuk mempercepat impuls listrik!
      </Instruction>
      <NeuronDiagram selected={value} onSelect={onChange} />
    </div>
  );
}

function Q3({
  value,
  onChange,
}: {
  value: Answers["q3"];
  onChange: (v: Answers["q3"]) => void;
}) {
  const items: { key: "a" | "b" | "c"; text: string }[] = [
    { key: "a", text: "Sistem Saraf menyalurkan sinyal sangat cepat dalam bentuk impuls listrik." },
    { key: "b", text: "Sistem Hormon menyalurkan zat kimia melalui pembuluh darah." },
    {
      key: "c",
      text: "Gerak refleks pada tangan yang terkena panas dikendalikan dan dipikirkan dulu oleh Otak Besar.",
    },
  ];
  return (
    <div className="space-y-4">
      <Narrative>
        Analisislah 3 pernyataan tentang perbedaan cara kerja Sistem Saraf dan Sistem Hormon dalam
        tubuh manusia di bawah ini!
      </Narrative>
      <div className="space-y-3">
        {items.map((it) => (
          <div
            key={it.key}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border bg-card p-4"
          >
            <p className="min-w-0 text-sm leading-relaxed">
              <span className="mr-2 font-bold text-primary">
                {it.key.toUpperCase()}.
              </span>
              {it.text}
            </p>
            <div className="flex shrink-0 gap-1 rounded-full bg-secondary p-1">
              {[
                { v: true, label: "Benar" },
                { v: false, label: "Salah" },
              ].map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => onChange({ ...value, [it.key]: opt.v })}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                    value[it.key] === opt.v
                      ? opt.v
                        ? "bg-success text-success-foreground"
                        : "bg-destructive text-destructive-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Q4({
  value,
  onChange,
}: {
  value: Record<string, string>;
  onChange: (v: Record<string, string>) => void;
}) {
  const [activeLeft, setActiveLeft] = useState<string | null>(null);
  const takenRight = useMemo(() => Object.values(value), [value]);

  const pick = (rightId: string) => {
    if (!activeLeft) return;
    const next = { ...value };
    for (const k of Object.keys(next)) if (next[k] === rightId) delete next[k];
    next[activeLeft] = rightId;
    onChange(next);
    setActiveLeft(null);
  };

  return (
    <div className="space-y-4">
      <Instruction>Jodohkan Kelenjar / Organ pengendali dengan fungsinya dalam tubuh!</Instruction>
      <p className="text-xs text-muted-foreground">
        Ketuk kartu organ di kiri, lalu ketuk kartu fungsi yang sesuai di kanan.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          {MATCH_LEFT.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setActiveLeft(l.id)}
              className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                activeLeft === l.id
                  ? "border-accent bg-accent/10"
                  : value[l.id]
                    ? "border-primary/50 bg-primary/5"
                    : "border-border bg-card hover:border-accent"
              }`}
            >
              <p className="text-sm font-bold">{l.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {value[l.id]
                  ? MATCH_RIGHT.find((r) => r.id === value[l.id])!.label
                  : "Belum dijodohkan"}
              </p>
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {MATCH_RIGHT.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => pick(r.id)}
              className={`w-full rounded-2xl border-2 p-4 text-left text-sm transition-all ${
                takenRight.includes(r.id)
                  ? "border-success/60 bg-success/10 font-semibold"
                  : "border-border bg-card text-muted-foreground hover:border-accent hover:bg-secondary/60"
              }`}
            >
              <span className="flex items-start gap-2">
                {takenRight.includes(r.id) && <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />}
                <span className="min-w-0">{r.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Q5({ value, onChange }: { value: number | null; onChange: (v: number) => void }) {
  const current = value ?? 0;
  return (
    <div className="space-y-5">
      <Narrative>
        Siswa kelas IX sedang berolahraga lari di lapangan bawah terik matahari siang. Suhu tubuh
        mereka meningkat hingga 39°C. Otak (Hipotalamus) mendeteksi perubahan ini dan segera
        mengeksekusi mekanisme pertahanan.
      </Narrative>
      <Instruction>
        Geser slider respon tubuh ke opsi yang BENAR untuk mengembalikan suhu tubuh ke kondisi
        seimbang 37°C!
      </Instruction>
      <div className="flex items-center gap-4 rounded-2xl bg-secondary/50 p-4">
        <ThermoIcon />
        <div className="min-w-0">
          <p className="text-2xl font-black text-destructive">39°C</p>
          <p className="text-xs text-muted-foreground">Target keseimbangan: 37°C</p>
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <Slider
          value={[current]}
          onValueChange={(v) => onChange(v[0])}
          min={0}
          max={2}
          step={1}
          aria-label="Pilihan respon tubuh"
        />
        <div className="mt-5 space-y-2">
          {SLIDER_OPTIONS.map((opt, i) => (
            <div
              key={opt}
              className={`rounded-xl px-3 py-2 text-sm transition-colors ${
                value === i
                  ? "bg-primary/10 font-bold text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {i + 1}. {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Q6({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-4">
      <Narrative>
        Homeostasis adalah kemampuan tubuh manusia untuk menjaga kondisi lingkungan internal tetap
        stabil dan seimbang meskipun lingkungan luar berubah.
      </Narrative>
      <Instruction>
        Pilih 1 dari 3 kartu skenario di bawah yang menggambarkan proses Homeostasis!
      </Instruction>
      <div className="grid gap-3 md:grid-cols-3">
        {HOMEOSTASIS_CARDS.map((c) => (
          <OptionCard key={c.id} active={value === c.id} onClick={() => onChange(c.id)}>
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-accent">
              {c.title}
            </span>
            {c.text}
          </OptionCard>
        ))}
      </div>
    </div>
  );
}

function Q7({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-4">
      <Narrative>
        Setelah selesai berolahraga, Budi minum es boba yang manis dan tinggi gula. Beberapa menit
        kemudian, kadar glukosa dalam darah Budi melonjak naik tajam di atas batas normal.
      </Narrative>
      <Instruction>
        Apakah tindakan otomatis yang dilakukan organ tubuh Budi untuk mengatasi lonjakan gula darah
        tersebut?
      </Instruction>
      <div className="space-y-3">
        {BOBA_CARDS.map((c) => (
          <OptionCard key={c.id} active={value === c.id} onClick={() => onChange(c.id)}>
            {c.text}
          </OptionCard>
        ))}
      </div>
    </div>
  );
}

function Q8({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-4">
      <Narrative>
        Jarum yang tertusuk di ujung jari atau panci panas yang tersentuh memicu gerakan menarik
        tangan sebelum kita menyadarinya.
      </Narrative>
      <Instruction>
        Mengapa sinyal gerak refleks saat tertusuk jarum atau terkena panas dibelokkan di Sumsum
        Tulang Belakang dan TIDAK menunggu diproses oleh Otak Besar terlebih dahulu?
      </Instruction>
      <div className="space-y-3">
        {MC8.map((c) => (
          <OptionCard key={c.id} active={value === c.id} onClick={() => onChange(c.id)}>
            <span className="mr-2 font-bold text-primary">{c.id.toUpperCase()}.</span>
            {c.text}
          </OptionCard>
        ))}
      </div>
    </div>
  );
}

function Q9({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const toggle = (id: string) =>
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  return (
    <div className="space-y-4">
      <Instruction>Pilih 2 Ciri Utama dari cara kerja Sistem Saraf dalam tubuh!</Instruction>
      <p className="text-xs text-muted-foreground">Terpilih: {value.length} dari 2 ciri.</p>
      <div className="space-y-3">
        {MULTI9.map((c) => (
          <label
            key={c.id}
            className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 text-sm transition-all ${
              value.includes(c.id)
                ? "border-primary bg-primary/10 font-semibold"
                : "border-border bg-card text-muted-foreground hover:border-accent"
            }`}
          >
            <Checkbox
              checked={value.includes(c.id)}
              onCheckedChange={() => toggle(c.id)}
              className="mt-0.5 shrink-0"
            />
            <span className="min-w-0">{c.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function Q10({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-4">
      <Narrative>
        Kurang tidur / begadang dapat mengganggu keseimbangan hormon dan kerja sistem saraf sehingga
        tubuh sulit menjaga homeostasis.
      </Narrative>
      <Instruction>
        Tuliskan 1 Kebiasaan Buruk yang ingin kamu kurangi mulai malam ini agar tubuhmu tetap sehat!
      </Instruction>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={120}
        placeholder="Contoh: mengurangi main HP sampai lewat tengah malam"
        className="h-12 rounded-xl text-base"
      />
      {value.trim().length >= 3 && (
        <div className="animate-pop-in">
          <Badge className="rounded-full bg-success px-4 py-2 text-sm text-success-foreground">
            Janji Sehat: {value.trim()}
          </Badge>
        </div>
      )}
    </div>
  );
}

export const QUESTION_TITLES = [
  "Alur Gerak Refleks",
  "Bagian Sel Saraf",
  "Saraf vs Hormon",
  "Jodohkan Organ Pengendali",
  "Termoregulasi Suhu Tubuh",
  "Skenario Homeostasis",
  "Kasus Es Boba & Gula Darah",
  "Analisis Jalur Refleks",
  "Ciri Sistem Saraf",
  "Refleksi Kebiasaan Sehat",
];

export function QuestionRenderer({
  index,
  answers,
  setAnswers,
}: {
  index: number;
  answers: Answers;
  setAnswers: (updater: (prev: Answers) => Answers) => void;
}) {
  switch (index) {
    case 0:
      return <Q1 value={answers.q1} onChange={(v) => setAnswers((p) => ({ ...p, q1: v }))} />;
    case 1:
      return <Q2 value={answers.q2} onChange={(v) => setAnswers((p) => ({ ...p, q2: v }))} />;
    case 2:
      return <Q3 value={answers.q3} onChange={(v) => setAnswers((p) => ({ ...p, q3: v }))} />;
    case 3:
      return <Q4 value={answers.q4} onChange={(v) => setAnswers((p) => ({ ...p, q4: v }))} />;
    case 4:
      return <Q5 value={answers.q5} onChange={(v) => setAnswers((p) => ({ ...p, q5: v }))} />;
    case 5:
      return <Q6 value={answers.q6} onChange={(v) => setAnswers((p) => ({ ...p, q6: v }))} />;
    case 6:
      return <Q7 value={answers.q7} onChange={(v) => setAnswers((p) => ({ ...p, q7: v }))} />;
    case 7:
      return <Q8 value={answers.q8} onChange={(v) => setAnswers((p) => ({ ...p, q8: v }))} />;
    case 8:
      return <Q9 value={answers.q9} onChange={(v) => setAnswers((p) => ({ ...p, q9: v }))} />;
    default:
      return <Q10 value={answers.q10} onChange={(v) => setAnswers((p) => ({ ...p, q10: v }))} />;
  }
}
