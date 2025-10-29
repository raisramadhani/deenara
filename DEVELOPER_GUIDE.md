# Developer Guide - Deenara E-Commerce

## 🏗️ Arsitektur Aplikasi

### Struktur Folder

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── Loading.jsx
│   └── ErrorMessage.jsx
├── context/            # React Context untuk state management
│   └── CartContext.jsx
├── pages/              # Page components (route-level)
│   ├── HomePage.jsx
│   ├── ProductsPage.jsx
│   ├── ProductDetailPage.jsx
│   └── CartPage.jsx
├── services/           # API service layer
│   └── api.js
├── utils/              # Utility functions & constants
│   ├── constants.js
│   └── helpers.js
├── App.jsx             # Root component dengan routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🧩 Komponen Utama

### 1. CartContext (State Management)

```jsx
import { useCart } from "./context/CartContext";

// Available methods:
const {
  cartItems, // Array of cart items
  addToCart, // (product) => void
  removeFromCart, // (productId) => void
  updateQuantity, // (productId, quantity) => void
  clearCart, // () => void
  getCartTotal, // () => number
  getCartCount, // () => number
} = useCart();
```

### 2. API Service

```javascript
import { productService } from "./services/api";

// Available methods:
await productService.getAllProducts();
await productService.getProductById(id);
await productService.getCategories();
await productService.getProductsByCategory(category);
await productService.getLimitedProducts(limit);
```

## 🎨 Styling Guide

### Tailwind CSS Classes

**Custom Components:**

```css
.btn-primary     /* Primary button style */
/* Primary button style */
.btn-secondary   /* Secondary button style */
.card; /* Card component style */
```

**Color Palette:**

```javascript
primary: "#3182CE"; // Arctic Blue
charcoal: "#2D3748"; // Dark Grey
border: "#E2E8F0"; // Light Grey
```

### Responsive Breakpoints

```javascript
sm: 640px   // Small devices
md: 768px   // Medium devices
lg: 1024px  // Large devices
xl: 1280px  // Extra large devices
```

## 🔧 Menambahkan Fitur Baru

### Membuat Page Baru

1. Buat file di folder `src/pages/`:

```jsx
// src/pages/NewPage.jsx
const NewPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1>New Page</h1>
      </div>
    </div>
  );
};

export default NewPage;
```

2. Tambahkan route di `App.jsx`:

```jsx
import NewPage from "./pages/NewPage";

<Route path="/new-page" element={<NewPage />} />;
```

### Membuat Component Baru

1. Buat file di folder `src/components/`:

```jsx
// src/components/NewComponent.jsx
const NewComponent = ({ prop1, prop2 }) => {
  return <div className="...">{/* Component content */}</div>;
};

export default NewComponent;
```

2. Import dan gunakan:

```jsx
import NewComponent from "../components/NewComponent";

<NewComponent prop1="value" prop2="value" />;
```

### Menambahkan API Endpoint Baru

Update `src/services/api.js`:

```javascript
export const productService = {
  // Existing methods...

  newMethod: async (params) => {
    const response = await api.get(`/new-endpoint/${params}`);
    return response.data;
  },
};
```

## 🔌 Integrasi dengan Backend

Jika ingin mengganti dengan backend sendiri:

1. Update `src/services/api.js`:

```javascript
const BASE_URL = "https://your-api.com";
```

2. Sesuaikan response handler jika structure berbeda:

```javascript
getAllProducts: async () => {
  const response = await api.get('/products');
  return response.data.products; // Sesuaikan dengan structure
},
```

3. Tambahkan authentication jika diperlukan:

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] Products list displays all products
- [ ] Category filter works
- [ ] Product detail page shows correct data
- [ ] Add to cart functionality works
- [ ] Cart quantity update works
- [ ] Remove from cart works
- [ ] Cart persists on page refresh
- [ ] Responsive design works on mobile/tablet
- [ ] Loading states display correctly
- [ ] Error handling works

### Automated Testing (Future)

```bash
# Install testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Create test files
src/
├── components/
│   ├── ProductCard.jsx
│   └── ProductCard.test.jsx
```

## 🚀 Performance Optimization

### Tips untuk Optimasi:

1. **Lazy Loading Images:**

```jsx
<img loading="lazy" src={product.image} alt={product.title} />
```

2. **Code Splitting:**

```jsx
import { lazy, Suspense } from "react";

const ProductsPage = lazy(() => import("./pages/ProductsPage"));

<Suspense fallback={<Loading />}>
  <ProductsPage />
</Suspense>;
```

3. **Memoization:**

```jsx
import { useMemo } from "react";

const filteredProducts = useMemo(() => {
  return products.filter((p) => p.category === selectedCategory);
}, [products, selectedCategory]);
```

## 🐛 Debugging

### Common Issues:

**Issue: Components not rendering**

- Check console untuk error messages
- Pastikan imports benar
- Verify route paths

**Issue: API calls failing**

- Check network tab di DevTools
- Verify API endpoint URL
- Check CORS settings

**Issue: State not updating**

- Verify Context Provider wrapper
- Check useEffect dependencies
- Console.log state values

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Router Docs](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)
- [FakeStore API](https://fakestoreapi.com)

## 🤝 Contributing

Jika ingin berkontribusi:

1. Fork repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

## 📝 Code Style

- Use functional components dengan hooks
- Follow ESLint rules
- Use meaningful variable names
- Add comments untuk complex logic
- Keep components small dan focused
- Extract reusable logic ke custom hooks

---

**Happy Coding! 💻**
