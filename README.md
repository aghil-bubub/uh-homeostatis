# Homeostasis Quest

Tolong buatkan Web Kuis Interaktif Evaluasi 'Sistem Koordinasi & Homeostasis' SMP Kelas IX menggunakan React, Tailwind CSS, dan Shadcn UI. Tampilan modern, bersih, bertema sains/biologi (warna hijau toska dan biru cyan).

PENTING UNTUK ATURAN SKOR SISWA & VISUAL:

SEMBUNYIKAN SKOR/NILAI ANGKA DARI SISWA: Pada halaman akhir (Score Screen) setelah siswa menekan tombol 'Submit', JANGAN tampilkan skor/nilai angka maupun jumlah benar/salah kepada siswa. Tampilkan saja ucapan 'Misi Selesai!', Lencana 'Homeostasis Master', Efek Confetti, dan Badge Kebiasaan Sehat dari Soal 10. Nilai angka HANYA dikirimkan ke Dashboard Guru dan Google Sheet.

Tampilkan narasi cerita kasus yang lengkap dan menarik pada soal-soal berbasis skenario agar siswa dapat menganalisis situasi terlebih dahulu.

Buatkan semua gambar/diagram menggunakan SVG Inline secara langsung di dalam kode (SVG vector icon/diagram), jangan menggunakan URL gambar eksternal agar web bebas error.

FITUR AKSES GURU & INTEGRASI DATA:

Tombol 'Akses Guru' di Beranda (Halaman Utama):

Sediakan tombol 'Akses Guru' di pojok kanan atas beranda.

Proteksi modal login guru dengan Kode PIN: 2501.

Di dalam Dashboard Guru, tampilkan Tabel Rekap Nilai Siswa (Nama, Kelas, No. Absen, Skor Total/Nilai Angka, Timestamp, dan Janji Sehat) lengkap dengan fitur Export CSV.

Integrasi Google Sheets Automatic POST:

Saat siswa menekan tombol 'Submit', kirimkan data via Fetch API (POST request dengan mode: 'no-cors' dan headers: {'Content-Type': 'application/json'}) ke Web App URL berikut:

[https://script.google.com/macros/s/AKfycbz3MygiQWdNygKsW7wsFjx2Q_sxOIkDDcdWNlFKqSgf1dh19uVOiTacgTOiT2MxOxc/exec](https://script.google.com/macros/s/AKfycbz3MygiQWdNygKsW7wsFjx2Q_sxOIkDDcdWNlFKqSgf1dh19uVOiTacgTOiT2MxOxc/exec)

Payload JSON yang dikirim: { nama: string, kelas: string, noAbsen: string, skor: number, janjiSehat: string }.

FITUR SISWA & FORM AWAL:

Form Input di Beranda: Nama Lengkap, Kelas (IX-A, IX-B, IX-C), dan Nomor Absen. Tombol 'Mulai Misi'.

Progress Bar & Navigasi Soal (10 Soal Interaktif).

Score Screen Siswa: Ucapan 'Misi Berhasil Diselesaikan!', Lencana 'Homeostasis Master', Efek Confetti, Rekap Ringkas Pembahasan Materi, dan Badge Kebiasaan Sehat (Tanpa memperlihatkan nilai/skor angka).

RINCIAN 10 SOAL INTERAKTIF (LENGKAP DENGAN NARASI KASUS):

Soal 1 (Drag & Drop Alur Refleks):

Narasi: 'Saat belajar kelompok, Budi tidak sengaja menyenggol cangkir kopi yang sangat panas. Secara spontan, tangan Budi langsung ditarik mundur sebelum ia sempat berpikir!'

Instruksi: Urutkan 6 langkah alur refleks yang terjadi pada tubuh Budi dari awal sampai akhir! (1. Rangsangan Panas -> 2. Reseptor Kulit -> 3. Saraf Sensorik -> 4. Sumsum Tulang Belakang -> 5. Saraf Motorik -> 6. Efektor Otot Lengan).

Soal 2 (SVG Diagram Hotspot Sel Saraf):

Narasi: 'Agar sinyal refleks pada tangan Budi tadi bisa merambat sangat cepat, serabut akson dilapisi oleh jaringan berlemak sebagai isolator.'

Instruksi: Tampilkan SVG diagram Sel Saraf (Neuron) utuh. 'Klik pada bagian Selubung Mielin yang berfungsi membungkus akson untuk mempercepat impuls listrik!'.

Soal 3 (True/False Toggle Switches):

Narasi: 'Analisislah 3 pernyataan tentang perbedaan cara kerja Sistem Saraf dan Sistem Hormon dalam tubuh manusia di bawah ini!'

Pernyataan A: 'Sistem Saraf menyalurkan sinyal sangat cepat dalam bentuk impuls listrik.' (BENAR)

Pernyataan B: 'Sistem Hormon menyalurkan zat kimia melalui pembuluh darah.' (BENAR)

Pernyataan C: 'Gerak refleks pada tangan yang terkena panas dikendalikan dan dipikirkan dulu oleh Otak Besar.' (SALAH)

Soal 4 (Matching Cards / Jodohkan):

Instruksi: Jodohkan Kelenjar/Organ pengendali dengan fungsinya dalam tubuh!

Pasangan: Pankreas -> Menghasilkan Insulin untuk mengatur gula darah, Kelenjar Adrenal -> Menghasilkan Adrenalin saat kaget/stres, Sumsum Tulang Belakang -> Pusat pembalik sinyal gerak refleks.

Soal 5 (Interactive Slider Termoregulasi Suhu):

Narasi Kasus: 'Siswa kelas IX sedang berolahraga lari di lapangan bawah terik matahari siang. Suhu tubuh mereka meningkat hingga 39°C. Otak (Hipotalamus) mendeteksi perubahan ini dan segera mengeksekusi mekanisme pertahanan.'

Instruksi: Geser slider respon tubuh ke opsi yang BENAR untuk mengembalikan suhu tubuh ke kondisi seimbang 37°C!

Opsi Benar: 'Mengeluarkan Keringat & Pembuluh Darah Melebar'.

Soal 6 (Card Select Grid Homeostasis):

Narasi: 'Homeostasis adalah kemampuan tubuh manusia untuk menjaga kondisi lingkungan internal tetap stabil dan seimbang meskipun lingkungan luar berubah.'

Instruksi: Pilih 1 dari 3 kartu skenario di bawah yang menggambarkan proses Homeostasis!

Opsi Benar (Kartu A): 'Tubuh mengeluarkan keringat saat kepanasan agar suhu tubuh kembali stabil di 37°C.'

Soal 7 (Decision Story Card - Kasus Boba):

Narasi Kasus: 'Setelah selesai berolahraga, Budi minum es boba yang manis dan tinggi gula. Beberapa menit kemudian, kadar glukosa dalam darah Budi melonjak naik tajam di atas batas normal.'

Pertanyaan: Apakah tindakan otomatis yang dilakukan organ tubuh Budi untuk mengatasi lonjakan gula darah tersebut?

Kartu Benar: 'Organ Pankreas merespons dengan mengeluarkan hormon Insulin untuk menyerap glukosa darah agar kembali normal.'

Soal 8 (Multiple Choice Analisis Refleks):

Pertanyaan Analisis: 'Mengapa sinyal gerak refleks saat tertusuk jarum atau terkena panas dibelokkan di Sumsum Tulang Belakang dan TIDAK menunggu diproses oleh Otak Besar terlebih dahulu?'

Opsi Benar: 'Agar respons gerakan terjadi sangat cepat (spontan) untuk mencegah kerusakan jaringan tubuh yang lebih parah.'

Soal 9 (Multi-Select Checkbox):

Instruksi: Pilih 2 Ciri Utama dari cara kerja Sistem Saraf dalam tubuh!

Centang Benar: 'Bekerja sangat cepat dalam hitungan milidetik' dan 'Menggunakan sinyal listrik (impuls) melalui serabut saraf'.

Soal 10 (Interactive Short Input Refleksi):

Pertanyaan Refleksi: 'Kurang tidur/begadang dapat mengganggu keseimbangan hormon dan kerja sistem saraf. Tuliskan 1 Kebiasaan Buruk yang ingin kamu kurangi mulai malam ini agar tubuhmu tetap sehat!'

Efek: Tampilkan jawaban siswa sebagai 'Badge Janji Sehat' di halaman skor akhir.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://uh-homeostatis.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ad1ff6da-89be-4a91-ad0d-d12db62dc0cb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
