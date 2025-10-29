# 🚀 Quick Start Guide - Deenara

## Langkah Cepat

### 1. Instalasi Dependencies

```bash
npm install
```

### 2. Jalankan Development Server

```bash
npm run dev
```

### 3. Akses Aplikasi

Buka browser: http://localhost:5173

## 📱 Fitur yang Tersedia

✅ **Homepage** - Hero section + Featured products  
✅ **Products Page** - List semua produk + Filter kategori  
✅ **Product Detail** - Detail lengkap produk + Add to cart  
✅ **Shopping Cart** - Manage cart items + Quantity control

## 🎨 Tech Stack

- **React 18.3** - UI Library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - API calls
- **Context API** - State management
- **FakeStore API** - Data source

## 📂 File Penting

```
src/
├── pages/           # Halaman utama
├── components/      # UI components
├── context/         # State management
├── services/        # API services
└── utils/           # Helper functions
```

## 🌐 API Endpoints

Base URL: `https://fakestoreapi.com`

- `/products` - All products
- `/products/{id}` - Single product
- `/products/categories` - All categories
- `/products/category/{category}` - Products by category

## 🎯 Struktur Route

- `/` - Homepage
- `/products` - Products listing
- `/product/:id` - Product detail
- `/cart` - Shopping cart
- `*` - 404 Not Found

## 🔧 Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📚 Dokumentasi Lengkap

- **README.md** - Overview lengkap
- **DEVELOPER_GUIDE.md** - Panduan developer
- **DEPLOYMENT.md** - Panduan deployment
- **CHANGELOG.md** - Version history

## 🎨 Color Theme

```
Primary: #3182CE (Arctic Blue)
Charcoal: #2D3748 (Dark Grey)
Border: #E2E8F0 (Light Grey)
Background: #FFFFFF / #F9F9F9
```

## 💡 Tips

1. Cart tersimpan di localStorage (persistent)
2. Responsive di semua device
3. Loading states untuk better UX
4. Error handling untuk API failures

## 🐛 Troubleshooting

**Port sudah digunakan?**

```bash
# Edit vite.config.js, tambahkan:
server: { port: 3000 }
```

**Dependencies error?**

```bash
npm install --force
```

**Build error?**

```bash
rm -rf node_modules package-lock.json
npm install
```

---

**Happy Coding! 💻**

Untuk pertanyaan lebih lanjut, lihat dokumentasi lengkap di README.md
