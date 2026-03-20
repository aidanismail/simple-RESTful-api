# Simple Music Album API
[![CI/CD Pipeline](https://github.com/aidanismail/simple-RESTful-api/actions/workflows/pipeline.yml/badge.svg)](https://github.com/aidanismail/simple-RESTful-api/actions/workflows/pipeline.yml)

## 1. Deskripsi Project
Proyek ini adalah sebuah RESTful API sederhana yang dibangun menggunakan Node.js dan Express.js untuk keperluan **Manajemen Koleksi Album Musik**. API ini mendukung operasi dasar CRUD (Create, Read) dengan penyimpanan *in-memory array*, serta dirancang terintegrasi penuh dengan ekosistem Docker dan alur kerja CI/CD (Continuous Integration & Continuous Delivery).

---

## 2. Dokumentasi API

### Endpoint List
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/albums` | Mengambil seluruh data album musik |
| `POST` | `/api/albums` | Menambahkan data album musik baru |

### Format Response

**✅ Response Success (Contoh `POST /api/albums`):**
Status Code: `201 Created`

```json
{
  "message": "Album berhasil ditambahkan",
  "data": {
    "id": 1,
    "title": "The Dark Side of the Moon",
    "artist": "Pink Floyd",
    "release_date": "1973-03-01"
  }
}
```

**❌ Response Error (Contoh Validasi Gagal):**
Status Code: `400 Bad Request`

```json
{
  "message": "Title, artist, dan release_date wajib diisi!"
}
```

---

## 3. Panduan Instalasi (Docker)

Aplikasi ini telah di-*containerize* dan dapat dijalankan dengan mudah menggunakan Docker Compose.

**Langkah-langkah menjalankan aplikasi:**
1. Pastikan Docker Desktop telah berjalan di sistem Anda.
2. Buka terminal di dalam direktori proyek ini.
3. Jalankan perintah berikut untuk membangun dan menyalakan kontainer:
   ```bash
   docker-compose up -d --build
   ```

**Informasi Port:**
Aplikasi berjalan menggunakan pemetaan port **`3000:3000`**.
- **Host Port:** `3000` (Port yang diakses dari *browser*/Postman lokal Anda di `http://localhost:3000`).
- **Container Port:** `3000` (Port yang terekspos dari dalam lingkungan Node.js Docker).

---

## 4. Alur Kerja Git

Proyek ini menerapkan *Feature Branch Workflow* yang ketat dengan struktur cabang sebagai berikut:
- **`main`**: Berisi kode *production-ready* yang stabil.
- **`develop`**: Cabang integrasi utama (*staging*) tempat fitur-fitur digabungkan sebelum rilis.
- **`feature/*`**: Cabang eksperimental untuk pengembangan fitur spesifik (contoh: `feature/api-crud`, `feature/setup-cicdcs`).

**Bukti Penggunaan Conventional Commits:**
Setiap pesan *commit* mengikuti standar konvensional untuk kejelasan riwayat, contohnya:
- `feat: implementasi endpoint CRUD untuk API album musik`
- `chore: menambahkan jest dan supertest untuk testing`
- `fix: menambahkan script test jest di package.json`

---

## 5. Status Automasi (GitHub Actions)

Proyek ini menggunakan GitHub Actions (`.github/workflows/pipeline.yml`) untuk memastikan kualitas dan keamanan kode setiap kali terdapat *Push* atau *Pull Request* ke branch `develop` dan `main`.

**Penjelasan Workflow:**
1. **CI (Continuous Integration):** Menjalankan *Unit Testing* secara otomatis menggunakan **Jest & Supertest** untuk memverifikasi fungsionalitas *endpoint* API.
2. **CS (Continuous Security):** Menjalankan pemindaian keamanan (*Security Scan*) otomatis menggunakan perintah `npm audit` untuk mendeteksi kerentanan pada dependensi aplikasi.
3. **CD (Continuous Delivery):** Mengeksekusi perintah `docker build` pada tahap akhir untuk memvalidasi bahwa aplikasi sukses dibungkus ke dalam Docker Image tanpa kendala.