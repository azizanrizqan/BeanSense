# Requirements Document

## Introduction

BeanSense AI adalah aplikasi klasifikasi biji kopi berbasis machine learning (KNN) yang dibangun dengan Flask. Saat ini UI-nya sangat sederhana — background abu-abu, container putih, tombol coklat polos, tanpa animasi atau visual hierarchy yang jelas.

Fitur ini bertujuan melakukan redesign UI menjadi tampilan premium, modern, dan elegan — setara produk SaaS kelas atas atau aplikasi AI profesional. Scope terbatas pada satu halaman HTML (`index.html`) dengan Jinja2 templating. Tidak ada perubahan pada backend logic, endpoint, atau struktur data response.

---

## Glossary

- **Page**: Halaman tunggal `index.html` yang di-render oleh Flask dengan Jinja2 templating.
- **Upload_Zone**: Area interaktif di Page tempat pengguna memilih atau menjatuhkan file gambar biji kopi.
- **Predict_Button**: Tombol aksi utama yang men-submit form ke endpoint `/predict`.
- **Result_Panel**: Bagian di Page yang menampilkan hasil prediksi setelah response diterima dari server.
- **Confidence_Bar**: Komponen visual berupa progress bar yang merepresentasikan nilai confidence dari model KNN.
- **Preview_Image**: Gambar biji kopi yang diunggah, ditampilkan di Result_Panel setelah prediksi berhasil.
- **Loading_State**: Kondisi antara submit form dan munculnya Result_Panel, di mana Page menampilkan indikator proses.
- **Color_Palette**: Skema warna premium berbasis coklat gelap (`#1a0a00`), emas (`#c8a96e`), dan krem (`#f5efe6`).
- **Design_System**: Kumpulan aturan visual konsisten yang mencakup tipografi, spacing, warna, dan komponen yang digunakan di seluruh Page.

---

## Requirements

### Requirement 1: Design System dan Visual Foundation

**User Story:** Sebagai pengguna, saya ingin melihat tampilan yang konsisten dan premium di seluruh halaman, sehingga aplikasi terasa profesional dan terpercaya.

#### Acceptance Criteria

1. THE Page SHALL menggunakan Color_Palette berbasis coklat gelap (`#1a0a00` sebagai background utama), emas (`#c8a96e` sebagai aksen), dan krem (`#f5efe6` sebagai teks utama) secara konsisten di seluruh elemen.
2. THE Page SHALL menggunakan font Google Fonts "Inter" untuk teks antarmuka dan "Playfair Display" untuk heading utama, dimuat via CDN.
3. THE Page SHALL menerapkan Design_System dengan spacing berbasis kelipatan 8px (8, 16, 24, 32, 48px) untuk margin dan padding seluruh komponen.
4. THE Page SHALL menampilkan background dengan efek gradient radial dari `#2d1200` ke `#1a0a00` untuk menciptakan kedalaman visual.
5. THE Page SHALL menerapkan border-radius 16px pada card/container utama dan 8px pada elemen sekunder (input, tombol kecil).
6. THE Page SHALL memastikan seluruh teks memenuhi rasio kontras minimum 4.5:1 terhadap background sesuai WCAG 2.1 Level AA.

---

### Requirement 2: Header dan Branding

**User Story:** Sebagai pengguna, saya ingin melihat identitas aplikasi yang kuat di bagian atas halaman, sehingga saya langsung memahami tujuan dan nama aplikasi.

#### Acceptance Criteria

1. THE Page SHALL menampilkan nama "BeanSense AI" sebagai heading utama menggunakan font "Playfair Display" dengan ukuran minimum 36px.
2. THE Page SHALL menampilkan ikon kopi (☕ atau SVG setara) di sebelah kiri nama aplikasi dalam heading utama.
3. THE Page SHALL menampilkan tagline "Coffee Bean Classification" di bawah heading utama menggunakan font "Inter" dengan ukuran 14–16px dan warna emas (`#c8a96e`).
4. THE Page SHALL menampilkan garis dekoratif tipis berwarna emas di bawah area header sebagai pemisah visual.

---

### Requirement 3: Upload Zone Interaktif

**User Story:** Sebagai pengguna, saya ingin area upload yang jelas dan menarik secara visual, sehingga saya tahu persis di mana harus meletakkan gambar biji kopi saya.

#### Acceptance Criteria

1. THE Upload_Zone SHALL ditampilkan sebagai area persegi panjang dengan border dashed berwarna emas (`#c8a96e`) dan background semi-transparan.
2. THE Upload_Zone SHALL menampilkan ikon upload (SVG panah ke atas) berukuran 48x48px di tengah area.
3. THE Upload_Zone SHALL menampilkan teks instruksi "Klik untuk memilih gambar" dan teks sekunder "Format: JPG, PNG — Maks. 10MB" di bawah ikon.
4. WHEN pengguna mengarahkan kursor ke Upload_Zone, THE Upload_Zone SHALL mengubah border menjadi solid dan meningkatkan opacity background sebagai feedback hover.
5. WHEN pengguna memilih file melalui Upload_Zone, THE Upload_Zone SHALL menampilkan nama file yang dipilih menggantikan teks instruksi default.
6. THE Upload_Zone SHALL menyembunyikan elemen `<input type="file">` default browser dan menggantinya dengan tampilan Upload_Zone kustom yang tetap fungsional sebagai trigger file picker.

---

### Requirement 4: Predict Button Premium

**User Story:** Sebagai pengguna, saya ingin tombol prediksi yang menonjol dan responsif, sehingga saya tahu kapan aksi saya diterima oleh sistem.

#### Acceptance Criteria

1. THE Predict_Button SHALL ditampilkan dengan background gradient dari `#c8a96e` ke `#a07840`, teks berwarna gelap (`#1a0a00`), font weight 600, dan lebar penuh container.
2. THE Predict_Button SHALL memiliki tinggi minimum 52px dan font size 16px untuk memenuhi target tap area yang memadai.
3. WHEN pengguna mengarahkan kursor ke Predict_Button, THE Predict_Button SHALL menampilkan efek elevasi (box-shadow lebih besar) dan pergeseran posisi ke atas sebesar 2px dalam durasi transisi 200ms.
4. WHEN pengguna menekan Predict_Button, THE Predict_Button SHALL menampilkan efek scale-down (transform: scale(0.98)) sebagai feedback klik.
5. WHILE Loading_State aktif, THE Predict_Button SHALL menampilkan teks "Menganalisis..." dan ikon spinner berputar, serta dinonaktifkan (disabled) untuk mencegah submit ganda.

---

### Requirement 5: Loading State

**User Story:** Sebagai pengguna, saya ingin melihat indikator proses yang jelas saat gambar sedang dianalisis, sehingga saya tahu sistem sedang bekerja dan tidak mengira aplikasi hang.

#### Acceptance Criteria

1. WHEN form di-submit, THE Page SHALL menampilkan Loading_State berupa overlay atau animasi di area Result_Panel sebelum response server diterima.
2. WHILE Loading_State aktif, THE Page SHALL menampilkan animasi pulse atau spinner berwarna emas yang berputar dengan durasi siklus 1 detik.
3. WHILE Loading_State aktif, THE Page SHALL menampilkan teks "Menganalisis biji kopi..." di bawah animasi spinner.
4. WHEN response server diterima, THE Page SHALL menyembunyikan Loading_State dan menampilkan Result_Panel dengan animasi fade-in durasi 400ms.

---

### Requirement 6: Result Panel

**User Story:** Sebagai pengguna, saya ingin melihat hasil prediksi yang disajikan secara visual menarik dan informatif, sehingga saya dapat dengan mudah membaca jenis kopi dan tingkat kepercayaan model.

#### Acceptance Criteria

1. WHEN prediksi berhasil diterima, THE Result_Panel SHALL ditampilkan dengan animasi slide-up dan fade-in dari bawah dalam durasi 400ms.
2. THE Result_Panel SHALL menampilkan label "Hasil Prediksi" sebagai sub-heading dengan ukuran 12px uppercase dan letter-spacing 2px.
3. THE Result_Panel SHALL menampilkan nama jenis kopi hasil prediksi (nilai `prediction` dari response) menggunakan font "Playfair Display" dengan ukuran minimum 28px dan warna emas.
4. THE Result_Panel SHALL menampilkan Confidence_Bar di bawah nama prediksi.
5. THE Confidence_Bar SHALL menampilkan progress bar dengan lebar yang proporsional terhadap nilai `confidence` dari response (0–100%), dengan warna fill gradient emas.
6. THE Confidence_Bar SHALL menampilkan nilai persentase confidence (nilai `confidence` dari response, dibulatkan 2 desimal) di sebelah kanan progress bar.
7. THE Result_Panel SHALL menampilkan Preview_Image dari gambar yang diunggah menggunakan URL yang dibangun dari nilai `image` pada response.
8. THE Preview_Image SHALL ditampilkan dengan border-radius 12px, object-fit cover, dan dimensi maksimum 280x280px.
9. THE Result_Panel SHALL menampilkan tombol "Analisis Ulang" yang me-reset Page ke kondisi awal (menyembunyikan Result_Panel dan mengosongkan Upload_Zone) tanpa reload halaman.

---

### Requirement 7: Tipografi dan Hierarki Visual

**User Story:** Sebagai pengguna, saya ingin teks di seluruh halaman mudah dibaca dan memiliki hierarki yang jelas, sehingga saya dapat memindai informasi dengan cepat.

#### Acceptance Criteria

1. THE Page SHALL menerapkan hierarki tipografi tiga level: heading (Playfair Display, 36px+), sub-heading (Inter, 12–14px, uppercase, letter-spacing 2px), dan body (Inter, 14–16px).
2. THE Page SHALL menggunakan line-height minimum 1.5 untuk semua teks body agar keterbacaan terjaga.
3. THE Page SHALL tidak menggunakan lebih dari dua font family di seluruh halaman.
4. THE Page SHALL menampilkan semua label kategori (seperti label "Hasil Prediksi") dalam format uppercase dengan letter-spacing untuk membedakannya dari konten utama.

---

### Requirement 8: Responsivitas

**User Story:** Sebagai pengguna yang mengakses dari perangkat berbeda, saya ingin tampilan tetap rapi dan fungsional di berbagai ukuran layar, sehingga pengalaman tidak terganggu oleh perangkat yang saya gunakan.

#### Acceptance Criteria

1. THE Page SHALL menampilkan layout single-column yang terpusat dengan lebar maksimum 480px pada viewport lebar (≥768px).
2. WHEN viewport width kurang dari 480px, THE Page SHALL menyesuaikan padding container menjadi 16px dan font size heading utama menjadi minimum 28px.
3. THE Page SHALL menggunakan CSS media queries untuk menyesuaikan layout pada breakpoint 480px.
4. THE Upload_Zone SHALL memiliki tinggi minimum 160px pada semua ukuran viewport.
5. THE Predict_Button SHALL memiliki lebar 100% dari container pada semua ukuran viewport.

---

### Requirement 9: Micro-interactions dan Animasi

**User Story:** Sebagai pengguna, saya ingin elemen-elemen UI memberikan feedback visual yang halus saat saya berinteraksi, sehingga aplikasi terasa hidup dan responsif.

#### Acceptance Criteria

1. THE Page SHALL menerapkan CSS transition dengan durasi 200–400ms dan easing `ease-in-out` pada semua elemen interaktif (tombol, upload zone, link).
2. WHEN Page pertama kali dimuat, THE Page SHALL menampilkan animasi fade-in pada container utama dalam durasi 600ms.
3. THE Confidence_Bar SHALL menampilkan animasi fill dari 0% ke nilai confidence aktual dalam durasi 800ms saat Result_Panel pertama kali ditampilkan.
4. THE Page SHALL tidak menggunakan animasi yang berkedip atau bergerak terus-menerus (infinite loop) yang dapat mengganggu pengguna dengan kondisi vestibular disorder, kecuali selama Loading_State aktif.
5. WHERE browser mendukung `prefers-reduced-motion: reduce`, THE Page SHALL menonaktifkan semua animasi non-esensial dan mempertahankan hanya transisi opacity.

---

### Requirement 10: Kompatibilitas dan Performa

**User Story:** Sebagai pengguna, saya ingin halaman dimuat dengan cepat dan berjalan lancar di browser modern, sehingga saya tidak mengalami lag atau tampilan rusak.

#### Acceptance Criteria

1. THE Page SHALL dimuat sepenuhnya (termasuk font dan CSS) dalam waktu kurang dari 3 detik pada koneksi broadband standar (≥10 Mbps).
2. THE Page SHALL berfungsi dengan benar pada browser Chrome versi 90+, Firefox versi 88+, dan Edge versi 90+.
3. THE Page SHALL mengimplementasikan seluruh styling menggunakan CSS inline dalam tag `<style>` di dalam `index.html` tanpa memerlukan file CSS eksternal tambahan selain Google Fonts CDN.
4. THE Page SHALL mengimplementasikan seluruh interaktivitas menggunakan JavaScript inline dalam tag `<script>` di dalam `index.html` tanpa memerlukan library JavaScript eksternal.
5. IF Google Fonts CDN tidak dapat diakses, THE Page SHALL tetap menampilkan teks menggunakan fallback font stack `'Georgia', serif` untuk heading dan `'Arial', sans-serif` untuk body.
