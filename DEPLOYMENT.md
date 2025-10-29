# Deployment Guide - Deenara E-Commerce

## 📦 Build untuk Production

### 1. Build Aplikasi

```bash
npm run build
```

Output akan tersimpan di folder `dist/`

### 2. Preview Build Lokal

```bash
npm run preview
```

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel adalah platform yang sangat mudah untuk deploy aplikasi Vite/React.

1. Install Vercel CLI (opsional)

```bash
npm i -g vercel
```

2. Deploy dengan Vercel

```bash
vercel
```

**Atau deploy via GitHub:**

- Push code ke GitHub repository
- Kunjungi https://vercel.com
- Import repository
- Deploy otomatis

### Option 2: Netlify

1. Install Netlify CLI

```bash
npm i -g netlify-cli
```

2. Build dan deploy

```bash
npm run build
netlify deploy --prod
```

**Atau via Netlify UI:**

- Drag & drop folder `dist/` ke https://app.netlify.com/drop

### Option 3: GitHub Pages

1. Install gh-pages

```bash
npm install --save-dev gh-pages
```

2. Update `package.json`, tambahkan:

```json
"homepage": "https://yourusername.github.io/deenara",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Update `vite.config.js`:

```javascript
export default defineConfig({
  base: "/deenara/",
  plugins: [react()],
});
```

4. Deploy

```bash
npm run deploy
```

### Option 4: Static Hosting (Apache/Nginx)

1. Build aplikasi

```bash
npm run build
```

2. Upload folder `dist/` ke web server

3. Konfigurasi web server untuk SPA:

**Apache (.htaccess):**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 🔧 Environment Variables

Jika perlu environment variables untuk production:

1. Buat file `.env.production`

```env
VITE_API_URL=https://fakestoreapi.com
```

2. Gunakan di code:

```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

## ✅ Pre-deployment Checklist

- [ ] Test build lokal dengan `npm run build` dan `npm run preview`
- [ ] Pastikan semua dependencies sudah di install
- [ ] Update meta tags untuk SEO di `index.html`
- [ ] Test responsive di berbagai device
- [ ] Pastikan API endpoint berfungsi
- [ ] Hapus console.log dan debugging code
- [ ] Update README dengan URL production

## 🌐 Post-deployment

Setelah deploy:

1. Test semua fitur di production
2. Test di berbagai browser
3. Check responsiveness
4. Monitor performance dengan Lighthouse
5. Setup analytics (Google Analytics, dll) jika diperlukan

## 🐛 Troubleshooting

### 404 pada route refresh

Pastikan web server sudah dikonfigurasi untuk SPA (lihat section Static Hosting)

### Assets tidak load

Periksa `base` URL di `vite.config.js`

### API CORS issues

FakeStore API sudah support CORS, tapi jika ada masalah, pertimbangkan menggunakan proxy

---

**Happy Deploying! 🚀**
