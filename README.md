# Deenara - E-Commerce Web Application

![Deenara](https://img.shields.io/badge/React-18.3-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC)
![License](https://img.shields.io/badge/License-MIT-green)

Deenara adalah aplikasi web e-commerce modern yang dibangun dengan ReactJS, menampilkan desain UI yang clean dan responsif dengan integrasi API eksternal dari FakeStore API.

## 🎯 Fitur Utama

### 1. **Halaman Beranda (Homepage)**

- Tampilan hero section yang menarik
- Daftar produk unggulan/terbaru
- Navigasi yang intuitif
- Section fitur unggulan

### 2. **Halaman Daftar Produk (Product Listing)**

- Grid layout yang rapi untuk semua produk
- Filter berdasarkan kategori
- Tampilan card produk dengan gambar, nama, harga, dan rating
- Design responsif untuk semua ukuran layar

### 3. **Halaman Detail Produk (Product Detail)**

- Gambar produk yang lebih besar
- Informasi lengkap produk (nama, harga, deskripsi)
- Rating dan jumlah ulasan
- Tombol "Tambah ke Keranjang" dengan notifikasi
- Breadcrumb navigation

### 4. **Halaman Keranjang Belanja (Shopping Cart)**

- Daftar produk yang ditambahkan
- Kontrol kuantitas (tambah/kurang)
- Hapus item dari keranjang
- Ringkasan belanja dengan total
- Tombol kosongkan keranjang
- Local storage untuk persistensi data

## 🎨 Desain & Tema Warna

**Modern & Profesional Theme (Biru Arktik & Arang)**

- **Primary Color (Arctic Blue)**: `#3182CE` - Untuk CTA buttons dan aksen
- **Charcoal/Dark Grey**: `#2D3748` - Untuk teks utama dan UI penting
- **Border/Secondary**: `#E2E8F0` - Untuk border dan pembatas
- **Background**: `#FFFFFF` / `#F9F9F9` - Background bersih dengan negative space

## 🛠️ Teknologi yang Digunakan

- **ReactJS 18.3** - Library UI utama
- **React Router DOM 7** - Untuk routing dan navigasi
- **Axios** - HTTP client untuk API calls
- **Tailwind CSS 3** - Utility-first CSS framework
- **Context API** - State management untuk keranjang belanja
- **Vite** - Build tool dan development server
- **FakeStore API** - Sumber data produk

## 📁 Struktur Proyek

```
deenara/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Komponen navigasi utama
│   │   ├── ProductCard.jsx      # Card untuk tampilan produk
│   │   ├── Loading.jsx          # Komponen loading state
│   │   └── ErrorMessage.jsx     # Komponen error state
│   ├── context/
│   │   └── CartContext.jsx      # Context untuk state management cart
│   ├── pages/
│   │   ├── HomePage.jsx         # Halaman beranda
│   │   ├── ProductsPage.jsx     # Halaman daftar produk
│   │   ├── ProductDetailPage.jsx # Halaman detail produk
│   │   └── CartPage.jsx         # Halaman keranjang belanja
│   ├── services/
│   │   └── api.js               # Service untuk API calls
│   ├── App.jsx                  # Root component dengan routing
│   ├── main.jsx                 # Entry point aplikasi
│   └── index.css                # Global styles dengan Tailwind
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Cara Menjalankan Aplikasi

### Prerequisites

- Node.js (v16 atau lebih baru)
- npm atau yarn

### Instalasi

1. Clone repository atau ekstrak folder project

```bash
cd deenara
```

2. Install dependencies

```bash
npm install
```

3. Jalankan development server

```bash
npm run dev
```

4. Buka browser dan akses aplikasi di:

```
http://localhost:5173
```

### Build untuk Production

```bash
npm run build
```

File hasil build akan tersimpan di folder `dist/`

## 🔌 API Endpoints

Aplikasi menggunakan [FakeStore API](https://fakestoreapi.com/):

- **Get All Products**: `GET /products`
- **Get Single Product**: `GET /products/{id}`
- **Get Categories**: `GET /products/categories`
- **Get Products by Category**: `GET /products/category/{category}`
- **Get Limited Products**: `GET /products?limit={number}`

## ✨ Fitur Tambahan

- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Loading States
- ✅ Error Handling
- ✅ LocalStorage untuk persistensi cart
- ✅ Notifikasi saat menambah produk ke cart
- ✅ Smooth animations dan transitions
- ✅ Clean dan modern UI/UX

## 📱 Responsive Design

Aplikasi fully responsive dengan breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Use Cases

1. **Browse Products**: User dapat menjelajahi semua produk atau filter berdasarkan kategori
2. **View Product Details**: User dapat melihat detail lengkap produk sebelum membeli
3. **Add to Cart**: User dapat menambahkan produk ke keranjang dengan notifikasi konfirmasi
4. **Manage Cart**: User dapat mengubah kuantitas atau menghapus item dari keranjang
5. **Cart Persistence**: Cart tersimpan di localStorage sehingga tidak hilang saat refresh

## 🔮 Future Enhancements

- [ ] Search functionality
- [ ] Sort products (by price, rating, etc.)
- [ ] User authentication
- [ ] Wishlist feature
- [ ] Checkout process
- [ ] Payment integration
- [ ] Order history

## 👨‍💻 Developer

Developed with ❤️ for portfolio demonstration

## 📄 License

This project is open source and available under the MIT License.

---

**Note**: Aplikasi ini dibuat untuk tujuan portfolio dan demonstrasi kemampuan dalam membangun UI modern dengan ReactJS. Fitur checkout dan payment adalah mockup dan belum terintegrasi dengan payment gateway sebenarnya.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
