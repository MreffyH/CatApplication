# Mobile Phylab

Mobile Phylab adalah aplikasi versi mobile dari website Phylab yang dirancang untuk membantu pengguna mempelajari dan memahami konsep Gerak Lurus Beraturan (GLB) dan Gerak Lurus Berubah Beraturan (GLBB) melalui penjelasan, formula, permainan interaktif, dan kuis evaluasi.

---

## Fitur Utama

### 1. **Home Page**
- Sebagai pusat navigasi yang menyediakan akses ke berbagai halaman aplikasi, yaitu:
  - Login Page
  - Register Page
  - GLB Page
  - GLBB Page
  - Kuis Page

### 2. **Login Page dan Register Page**
- **Login Page**:
  - Memeriksa data login pengguna melalui Firebase Authentication.
  - Jika data akun cocok, pengguna dapat masuk ke aplikasi.
- **Register Page**:
  - Mengizinkan pengguna baru untuk membuat akun.
  - Data akun pengguna akan disimpan di Firebase untuk proses autentikasi selanjutnya.

### 3. **GLB Page (Gerak Lurus Beraturan)**
- Berisi:
  - Penjelasan singkat tentang konsep GLB.
  - Formula dasar GLB.
  - Permainan interaktif:
    - Pengguna dapat memasukkan nilai kecepatan (velocity).
    - Aplikasi menghitung waktu yang dibutuhkan untuk menyelesaikan permainan berdasarkan input pengguna.

### 4. **GLBB Page (Gerak Lurus Berubah Beraturan)**
- Berisi:
  - Penjelasan singkat tentang konsep GLBB.
  - Formula dasar GLBB.
  - Permainan interaktif:
    - Permainan "canon ball" untuk menembakkan bola ke target.
    - Target dapat dicapai berdasarkan input dan perhitungan GLBB yang dilakukan.

### 5. **Kuis Page**
- Menyediakan soal-soal interaktif untuk menguji pemahaman pengguna tentang konsep GLB dan GLBB.
- Setiap kali pengguna menyelesaikan kuis, skor mereka akan dihitung dan disimpan ke database Firebase.
- Jika pengguna mencoba kuis yang sama, data lama akan diperbarui secara otomatis dengan hasil yang baru.

---

## Penyimpanan Data Menggunakan Firebase

### 1. **Autentikasi Pengguna**
- **Login**:
  - Firebase memeriksa data akun yang diinputkan oleh pengguna.
  - Jika data valid, pengguna dapat masuk ke aplikasi.
- **Register**:
  - Data akun baru disimpan ke Firebase Authentication.

*Contoh data pengguna di Firebase Authentication:*  
![Contoh Data Firebase Authentication](/docs/BuktiAutentikasiFirebaseMobile.png)

### 2. **Data Kuis dan Permainan**
- Data hasil kuis dan permainan interaktif disimpan dalam Firebase Realtime Database.
- Contoh mekanisme penyimpanan:
  - Setiap pengguna memiliki ID unik di database.
  - Skor terbaru akan menggantikan skor sebelumnya untuk memastikan data tetap terkini.

*Contoh data hasil kuis di Firebase Database:*  
![Contoh Data Firebase Database](/docs/BuktiDatabaseFirebaseMobile.png)

---

## Cara Mendownload Aplikasi

1. Unduh dan instal aplikasi melalui proses build menggunakan **Expo Application Services (EAS)**.
2. Ikuti langkah-langkah berikut:
   - Clone repository dari project ini.
   - Jalankan perintah build melalui EAS:
     ```bash
     eas build --platform android
     ```
   - Setelah build selesai, unduh file APK dan instal di perangkat Anda.

---