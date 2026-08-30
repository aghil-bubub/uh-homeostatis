import { useState } from "react";
import { Download, Lock, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clearRecords, downloadCsv, loadRecords, type QuizRecord } from "@/lib/quiz-storage";

const PIN = "2501";

export function TeacherDialog() {
  const [open, setOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [records, setRecords] = useState<QuizRecord[]>([]);

  const submitPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === PIN) {
      setUnlocked(true);
      setError("");
      setRecords(loadRecords());
    } else {
      setError("Kode PIN salah. Silakan coba lagi.");
    }
  };

  const average = records.length
    ? Math.round(records.reduce((s, r) => s + r.skor, 0) / records.length)
    : 0;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setUnlocked(false);
          setPin("");
          setError("");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="rounded-full font-semibold">
          <Lock className="mr-1.5 h-4 w-4" /> Akses Guru
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        {!unlocked ? (
          <form onSubmit={submitPin} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Login Guru</DialogTitle>
              <DialogDescription>
                Masukkan Kode PIN guru untuk membuka Dashboard Rekap Nilai Siswa.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="pin">Kode PIN</Label>
              <Input
                id="pin"
                type="password"
                inputMode="numeric"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="h-11 rounded-xl"
              />
              {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            </div>
            <Button type="submit" className="w-full rounded-xl">
              Masuk Dashboard
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle>Dashboard Guru — Rekap Nilai Siswa</DialogTitle>
              <DialogDescription>
                {records.length} data pengerjaan tersimpan · Rata-rata nilai {average}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                className="rounded-full"
                onClick={() => downloadCsv(records)}
                disabled={records.length === 0}
              >
                <Download className="mr-1.5 h-4 w-4" /> Export CSV
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={() => setRecords(loadRecords())}
              >
                <Users className="mr-1.5 h-4 w-4" /> Muat ulang data
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full text-destructive"
                onClick={() => {
                  clearRecords();
                  setRecords([]);
                }}
                disabled={records.length === 0}
              >
                <Trash2 className="mr-1.5 h-4 w-4" /> Hapus semua
              </Button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>No. Absen</TableHead>
                    <TableHead>Nilai</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Janji Sehat</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        Belum ada siswa yang mengerjakan kuis.
                      </TableCell>
                    </TableRow>
                  )}
                  {records.map((r, i) => (
                    <TableRow key={`${r.nama}-${r.timestamp}-${i}`}>
                      <TableCell className="font-medium">{r.nama}</TableCell>
                      <TableCell>{r.kelas}</TableCell>
                      <TableCell>{r.noAbsen}</TableCell>
                      <TableCell className="font-bold text-primary">{r.skor}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{r.timestamp}</TableCell>
                      <TableCell className="max-w-56 text-xs">{r.janjiSehat}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
