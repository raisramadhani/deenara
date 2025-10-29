# 🎨 Asset Management Guide - Deenara

## 📁 Struktur Folder Asset

```
public/
├── favicon.ico                    # Favicon utama (ICO format)
├── favicon-16x16.png             # Favicon 16x16
├── favicon-32x32.png             # Favicon 32x32
├── apple-touch-icon.png          # Icon untuk iOS devices
├── android-chrome-192x192.png    # Icon untuk Android (192x192)
├── android-chrome-512x512.png    # Icon untuk Android (512x512)
├── logo.webp                     # Logo utama Deenara (WebP)
├── site.webmanifest              # PWA manifest
└── vite.svg                      # Vite default (opsional, bisa dihapus)
```

## 🖼️ Penggunaan Asset di Aplikasi

### 1. **Favicon & Meta Icons**

Semua favicon sudah diintegrasikan di `index.html`:

```html
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

**Lokasi:** Browser tab, bookmarks, shortcuts

---

### 2. **Logo Utama (logo.webp)**

#### Navbar (Header)

```jsx
// src/components/Navbar.jsx
<img src="/logo.webp" alt="Deenara Logo" className="h-10 w-10 object-contain" />
```

**Lokasi:** Top left corner pada semua halaman

#### Footer

```jsx
// src/components/Footer.jsx
<img src="/logo.webp" alt="Deenara Logo" className="h-10 w-10 object-contain" />
```

**Lokasi:** Footer brand section

---

### 3. **PWA Icons (Android Chrome)**

Icons untuk Progressive Web App support:

- **192x192**: `android-chrome-192x192.png`
- **512x512**: `android-chrome-512x512.png`

Digunakan di `site.webmanifest`:

```json
{
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**Lokasi:** Add to home screen pada mobile devices

---

### 4. **Apple Touch Icon**

Icon untuk iOS devices: `apple-touch-icon.png`

```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

**Lokasi:** iOS home screen shortcuts

---

## 🎯 Cara Mengakses Asset dari Kode

### Di HTML (index.html)

```html
<!-- Path langsung dari public/ -->
<link rel="icon" href="/favicon.ico" />
<img src="/logo.webp" alt="Logo" />
```

### Di React Components (JSX)

```jsx
// Path langsung dari public/
<img src="/logo.webp" alt="Logo" />
<img src="/favicon-32x32.png" alt="Icon" />
```

### Di CSS

```css
.logo {
  background-image: url("/logo.webp");
}
```

---

## 📝 Aturan & Best Practices

### ✅ DO's

1. **Letakkan di folder `public/`**

   - Semua static assets (logo, favicon, images)
   - Files yang tidak perlu di-process oleh Vite

2. **Gunakan path absolut**

   ```jsx
   ✅ <img src="/logo.webp" />
   ❌ <img src="../public/logo.webp" />
   ```

3. **Optimasi format**

   - Logo: WebP (modern & lightweight)
   - Favicon: ICO + PNG (compatibility)
   - Icons: PNG (PWA standard)

4. **Descriptive alt text**
   ```jsx
   ✅ <img src="/logo.webp" alt="Deenara Logo" />
   ❌ <img src="/logo.webp" alt="logo" />
   ```

### ❌ DON'Ts

1. **Jangan import dari public/**

   ```jsx
   ❌ import logo from '../public/logo.webp'
   ✅ <img src="/logo.webp" />
   ```

2. **Jangan menggunakan relative path untuk public assets**
   ```jsx
   ❌ <img src="./logo.webp" />
   ❌ <img src="../logo.webp" />
   ✅ <img src="/logo.webp" />
   ```

---

## 🔧 Mengganti/Update Asset

### Update Logo

1. Simpan file baru ke `public/logo.webp`
2. Refresh browser (Ctrl + F5 / Cmd + Shift + R)
3. Clear cache jika perlu

### Update Favicon

1. Replace files di `public/`:
   - `favicon.ico`
   - `favicon-16x16.png`
   - `favicon-32x32.png`
2. Hard refresh browser
3. Clear browser cache

### Update PWA Icons

1. Replace files:
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`
   - `apple-touch-icon.png`
2. Update `site.webmanifest` jika perlu
3. Test on mobile devices

---

## 🎨 Spesifikasi Asset

### Logo (logo.webp)

- **Format**: WebP
- **Size**: Flexible (recommended: 200x200 atau lebih)
- **Background**: Transparent atau solid
- **Usage**: Navbar, Footer, Social sharing

### Favicon.ico

- **Format**: ICO
- **Size**: 16x16, 32x32, 48x48 (multi-size)
- **Background**: Solid or transparent
- **Usage**: Browser tab icon

### Favicon PNG

- **favicon-16x16.png**: 16x16 pixels
- **favicon-32x32.png**: 32x32 pixels
- **Format**: PNG with transparency
- **Usage**: Modern browsers

### Apple Touch Icon

- **Size**: 180x180 pixels
- **Format**: PNG (no transparency)
- **Background**: Solid color
- **Usage**: iOS home screen

### Android Chrome Icons

- **192x192**: 192x192 pixels
- **512x512**: 512x512 pixels
- **Format**: PNG with transparency
- **Usage**: Android PWA, splash screen

---

## 🚀 Production Build

Saat build production (`npm run build`), semua files di `public/` akan otomatis di-copy ke folder `dist/`:

```bash
npm run build

# Output:
dist/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── logo.webp
├── site.webmanifest
└── assets/
    └── ... (bundled JS/CSS)
```

---

## 📱 PWA (Progressive Web App) Support

### Features Enabled

✅ **Add to Home Screen**

- Users dapat install aplikasi ke home screen
- Custom icons (android-chrome, apple-touch-icon)

✅ **Splash Screen**

- Android devices akan show splash dengan icon 512x512

✅ **Theme Color**

- Browser UI color: `#3182CE` (Arctic Blue)

### Testing PWA

1. **Chrome DevTools**

   - Open DevTools (F12)
   - Go to "Application" tab
   - Check "Manifest" section

2. **Mobile Testing**
   - Open website di mobile browser
   - Menu → "Add to Home Screen"
   - Test icon dan splash screen

---

## 🔗 Asset URLs dalam Production

### Development (localhost:5173)

```
http://localhost:5173/logo.webp
http://localhost:5173/favicon.ico
```

### Production (example.com)

```
https://example.com/logo.webp
https://example.com/favicon.ico
```

Path tetap sama, hanya domain yang berbeda.

---

## 📊 Asset Checklist

- [x] Favicon.ico tersedia dan berfungsi
- [x] Favicon PNG (16x16, 32x32) tersedia
- [x] Apple touch icon tersedia
- [x] Android chrome icons (192x192, 512x512) tersedia
- [x] Logo utama (logo.webp) tersedia
- [x] Site.webmanifest dikonfigurasi
- [x] Meta tags di index.html updated
- [x] Logo integrated di Navbar
- [x] Logo integrated di Footer
- [x] Theme color set (#3182CE)
- [x] PWA support enabled

---

## 💡 Tips

1. **Optimasi Performa**

   - Gunakan WebP untuk logo (lebih kecil dari PNG)
   - Compress images sebelum upload
   - Use lazy loading untuk images besar

2. **Consistency**

   - Gunakan logo yang sama di semua tempat
   - Maintain aspect ratio
   - Consistent branding colors

3. **Accessibility**

   - Selalu gunakan alt text
   - Ensure sufficient contrast
   - Provide fallback untuk old browsers

4. **Testing**
   - Test di berbagai devices
   - Check browser compatibility
   - Verify PWA functionality

---

**Note**: Semua asset di folder `public/` sudah terintegrasi dengan sempurna ke aplikasi Deenara! 🎉
