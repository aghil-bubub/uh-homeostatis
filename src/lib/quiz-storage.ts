export type QuizRecord = {
  nama: string;
  kelas: string;
  noAbsen: string;
  skor: number;
  janjiSehat: string;
  timestamp: string;
};

const KEY = "kuis-koordinasi-records";
export const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbz3MygiQWdNygKsW7wsFjx2Q_sxOIkDDcdWNlFKqSgf1dh19uVOiTacgTOiT2MxOxc/exec";

export function loadRecords(): QuizRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as QuizRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveRecord(record: QuizRecord) {
  if (typeof window === "undefined") return;
  const all = [record, ...loadRecords()];
  window.localStorage.setItem(KEY, JSON.stringify(all));
}

export function clearRecords() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export async function postToSheet(payload: Omit<QuizRecord, "timestamp">) {
  try {
    await fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Gagal mengirim data ke Google Sheet", error);
  }
}

export function toCsv(records: QuizRecord[]) {
  const head = ["Nama", "Kelas", "No. Absen", "Skor", "Timestamp", "Janji Sehat"];
  const escape = (value: string) => `"${String(value).replace(/"/g, '""')}"`;
  const rows = records.map((r) =>
    [r.nama, r.kelas, r.noAbsen, String(r.skor), r.timestamp, r.janjiSehat].map(escape).join(","),
  );
  return [head.map(escape).join(","), ...rows].join("\n");
}

export function downloadCsv(records: QuizRecord[]) {
  const blob = new Blob(["\uFEFF" + toCsv(records)], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `rekap-nilai-kuis-koordinasi-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
