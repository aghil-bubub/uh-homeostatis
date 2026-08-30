import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Rocket, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Confetti } from "@/components/quiz/Confetti";
import { TeacherDialog } from "@/components/quiz/TeacherDialog";
import { BrainIcon, DnaIcon, MedalIcon } from "@/components/quiz/svg-art";
import {
  QUESTION_TITLES,
  QuestionRenderer,
  RECAP,
  TOTAL_QUESTIONS,
  computeScore,
  emptyAnswers,
  isQuestionAnswered,
  type Answers,
} from "@/components/quiz/questions";
import { postToSheet, saveRecord } from "@/lib/quiz-storage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kuis Interaktif Sistem Koordinasi & Homeostasis — IPA Kelas IX" },
      {
        name: "description",
        content:
          "Kuis evaluasi interaktif Sistem Koordinasi, Saraf, Hormon, dan Homeostasis untuk siswa SMP kelas IX: 10 soal berbasis kasus dengan dashboard guru dan rekap nilai.",
      },
      { property: "og:title", content: "Kuis Interaktif Sistem Koordinasi & Homeostasis" },
      {
        property: "og:description",
        content:
          "Misi evaluasi IPA kelas IX: 10 soal interaktif tentang sistem saraf, hormon, dan homeostasis tubuh manusia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Stage = "home" | "quiz" | "done";

function Index() {
  const [stage, setStage] = useState<Stage>("home");
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [noAbsen, setNoAbsen] = useState("");
  const [formError, setFormError] = useState("");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [submitting, setSubmitting] = useState(false);

  const start = () => {
    if (!nama.trim() || !kelas || !noAbsen.trim()) {
      setFormError("Lengkapi nama, kelas, dan nomor absen sebelum memulai misi.");
      return;
    }
    setFormError("");
    setStage("quiz");
  };

  const submit = async () => {
    setSubmitting(true);
    const skor = computeScore(answers);
    const janjiSehat = answers.q10.trim();
    saveRecord({
      nama: nama.trim(),
      kelas,
      noAbsen: noAbsen.trim(),
      skor,
      janjiSehat,
      timestamp: new Date().toLocaleString("id-ID"),
    });
    await postToSheet({ nama: nama.trim(), kelas, noAbsen: noAbsen.trim(), skor, janjiSehat });
    setSubmitting(false);
    setStage("done");
  };

  const answeredCount = Array.from({ length: TOTAL_QUESTIONS }, (_, i) =>
    isQuestionAnswered(i, answers),
  ).filter(Boolean).length;

  if (stage === "home") {
    return (
      <main className="min-h-screen px-4 py-8 sm:py-14">
        <div className="mx-auto max-w-4xl space-y-8">
          <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl hero-gradient">
                <DnaIcon />
              </div>
              <p className="truncate text-sm font-bold uppercase tracking-widest text-primary">
                IPA · Kelas IX
              </p>
            </div>
            <TeacherDialog />
          </header>

          <section className="card-science overflow-hidden">
            <div className="hero-gradient px-6 py-10 text-center sm:px-12 sm:py-14">
              <Badge className="mb-4 rounded-full bg-background/25 text-primary-foreground backdrop-blur">
                Misi Evaluasi Interaktif
              </Badge>
              <h1 className="text-3xl font-black leading-tight text-primary-foreground sm:text-5xl">
                Sistem Koordinasi &amp; Homeostasis
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/90 sm:text-base">
                Jelajahi 10 misi berbasis kasus tentang sistem saraf, hormon, gerak refleks, dan cara
                tubuh menjaga keseimbangan internalnya.
              </p>
            </div>

            <div className="grid gap-6 p-6 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Tulis nama lengkapmu"
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="kelas">Kelas</Label>
                    <Select value={kelas} onValueChange={setKelas}>
                      <SelectTrigger id="kelas" className="h-12 rounded-xl">
                        <SelectValue placeholder="Pilih kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        {["IX-A", "IX-B", "IX-C"].map((k) => (
                          <SelectItem key={k} value={k}>
                            {k}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="absen">Nomor Absen</Label>
                    <Input
                      id="absen"
                      inputMode="numeric"
                      value={noAbsen}
                      onChange={(e) => setNoAbsen(e.target.value)}
                      placeholder="Contoh: 12"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>
                {formError && <p className="text-sm font-medium text-destructive">{formError}</p>}
                <Button onClick={start} size="lg" className="w-full rounded-xl text-base font-bold">
                  <Rocket className="mr-2 h-5 w-5" /> Mulai Misi
                </Button>
              </div>
              <div className="hidden shrink-0 md:block">
                <div className="animate-float-soft grid h-40 w-40 place-items-center rounded-3xl soft-gradient">
                  <BrainIcon />
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-3">
            {[
              { t: "10 Soal Interaktif", d: "Drag & drop, hotspot diagram, slider, hingga refleksi." },
              { t: "Berbasis Kasus", d: "Setiap soal punya narasi cerita untuk dianalisis." },
              { t: "Rekap Otomatis", d: "Nilai langsung tercatat untuk guru." },
            ].map((f) => (
              <div key={f.t} className="card-science p-5">
                <p className="text-sm font-bold text-foreground">{f.t}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
    );
  }

  if (stage === "quiz") {
    const last = index === TOTAL_QUESTIONS - 1;
    return (
      <main className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-foreground">{nama}</p>
              <p className="truncate text-xs text-muted-foreground">
                {kelas} · Absen {noAbsen}
              </p>
            </div>
            <Badge variant="secondary" className="shrink-0 rounded-full font-bold">
              Soal {index + 1}/{TOTAL_QUESTIONS}
            </Badge>
          </header>

          <div className="space-y-2">
            <Progress value={((index + 1) / TOTAL_QUESTIONS) * 100} className="h-2.5" />
            <p className="text-xs text-muted-foreground">
              {answeredCount} dari {TOTAL_QUESTIONS} soal sudah kamu jawab
            </p>
          </div>

          <section className="card-science animate-pop-in space-y-5 p-5 sm:p-8" key={index}>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                Misi {index + 1}
              </span>
              <h2 className="text-xl font-black sm:text-2xl">{QUESTION_TITLES[index]}</h2>
            </div>
            <QuestionRenderer index={index} answers={answers} setAnswers={setAnswers} />
          </section>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" /> Sebelumnya
            </Button>
            {last ? (
              <Button
                className="rounded-xl font-bold"
                onClick={submit}
                disabled={submitting || answeredCount < TOTAL_QUESTIONS}
              >
                {submitting ? "Mengirim…" : "Submit Misi"}
                <CheckCircle2 className="ml-1.5 h-4 w-4" />
              </Button>
            ) : (
              <Button
                className="rounded-xl font-bold"
                onClick={() => setIndex((i) => Math.min(TOTAL_QUESTIONS - 1, i + 1))}
                disabled={!isQuestionAnswered(index, answers)}
              >
                Berikutnya <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            )}
          </div>
          {last && answeredCount < TOTAL_QUESTIONS && (
            <p className="text-center text-xs text-muted-foreground">
              Masih ada soal yang belum dijawab. Gunakan tombol Sebelumnya untuk memeriksanya.
            </p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen px-4 py-10">
      <Confetti />
      <div className="relative z-10 mx-auto max-w-3xl space-y-6">
        <section className="card-science animate-pop-in overflow-hidden text-center">
          <div className="hero-gradient px-6 py-10">
            <div className="mx-auto w-fit animate-float-soft">
              <MedalIcon />
            </div>
            <h1 className="mt-4 text-3xl font-black text-primary-foreground sm:text-4xl">
              Misi Berhasil Diselesaikan!
            </h1>
            <p className="mt-2 text-sm text-primary-foreground/90">
              Kerja bagus, {nama}! Kamu telah menuntaskan seluruh misi Sistem Koordinasi &amp;
              Homeostasis.
            </p>
            <Badge className="mt-5 rounded-full bg-background/25 px-5 py-2 text-sm font-black tracking-wide text-primary-foreground backdrop-blur">
              <Sparkles className="mr-2 h-4 w-4" /> Lencana: Homeostasis Master
            </Badge>
          </div>

          <div className="space-y-4 p-6 sm:p-8">
            <div className="rounded-2xl border-2 border-dashed border-success/50 bg-success/10 p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-success">
                Badge Kebiasaan Sehat
              </p>
              <p className="mt-2 text-base font-bold text-foreground">“{answers.q10.trim()}”</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Janji sehatmu mulai malam ini — jaga tidur, jaga hormon, jaga homeostasis!
              </p>
            </div>
          </div>
        </section>

        <section className="card-science space-y-4 p-6 sm:p-8">
          <h2 className="text-xl font-black">Rekap Ringkas Pembahasan Materi</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {RECAP.map((r) => (
              <div key={r.title} className="rounded-2xl bg-secondary/50 p-4">
                <p className="text-sm font-bold text-primary">{r.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-secondary-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => {
              setAnswers(emptyAnswers);
              setIndex(0);
              setNama("");
              setKelas("");
              setNoAbsen("");
              setStage("home");
            }}
          >
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    </main>
  );
}
