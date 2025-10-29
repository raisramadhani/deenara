# 📋 Component & Page Reference - Deenara

## 🧩 Components (src/components/)

### 1. **Navbar.jsx**

```jsx
import Navbar from "./components/Navbar";
```

**Purpose**: Main navigation bar dengan logo, links, dan cart counter  
**Features**:

- Sticky navigation
- Cart counter badge
- Responsive menu
- Links ke Home, Products, Cart

**Props**: None (uses CartContext)

---

### 2. **Footer.jsx**

```jsx
import Footer from "./components/Footer";
```

**Purpose**: Website footer dengan links dan informasi  
**Features**:

- Brand information
- Quick links
- Categories
- Contact info
- Social media icons

**Props**: None

---

### 3. **ProductCard.jsx**

```jsx
import ProductCard from "./components/ProductCard";
<ProductCard product={productData} />;
```

**Purpose**: Reusable product card untuk product grid  
**Features**:

- Product image dengan zoom effect
- Product title (truncated)
- Price display
- Rating display
- Link ke detail page

**Props**:

- `product` (object): Product data dari API

---

### 4. **Loading.jsx**

```jsx
import Loading from "./components/Loading";
<Loading />;
```

**Purpose**: Loading state component dengan spinner  
**Features**:

- Animated spinner
- Centered display
- Loading message

**Props**: None

---

### 5. **ErrorMessage.jsx**

```jsx
import ErrorMessage from "./components/ErrorMessage";
<ErrorMessage message="Error text" />;
```

**Purpose**: Error state component  
**Features**:

- Error icon
- Custom error message
- Reload button

**Props**:

- `message` (string, optional): Custom error message

---

## 📄 Pages (src/pages/)

### 1. **HomePage.jsx**

```jsx
Route: /
```

**Purpose**: Landing page dengan hero dan featured products  
**Sections**:

- Hero section dengan CTA
- Featured products grid (8 items)
- Features showcase (3 items)

**API Calls**:

- `getLimitedProducts(8)` - Featured products

**State**:

- `featuredProducts` - Array of products
- `loading` - Boolean
- `error` - String or null

---

### 2. **ProductsPage.jsx**

```jsx
Route: /products
```

**Purpose**: Product listing dengan category filter  
**Features**:

- Category filter buttons
- Product count display
- Product grid (responsive)
- Empty state

**API Calls**:

- `getAllProducts()` - All products
- `getCategories()` - All categories

**State**:

- `products` - All products
- `filteredProducts` - Filtered products
- `categories` - Categories array
- `selectedCategory` - Selected category
- `loading` - Boolean
- `error` - String or null

---

### 3. **ProductDetailPage.jsx**

```jsx
Route: /product/:id
```

**Purpose**: Single product detail page  
**Features**:

- Large product image
- Complete product info
- Rating stars display
- Add to cart functionality
- Success notification
- Breadcrumb navigation

**API Calls**:

- `getProductById(id)` - Single product

**State**:

- `product` - Product object
- `loading` - Boolean
- `error` - String or null
- `showNotification` - Boolean

**Context Used**:

- `addToCart` from CartContext

---

### 4. **CartPage.jsx**

```jsx
Route: /cart
```

**Purpose**: Shopping cart management  
**Features**:

- Cart items list
- Quantity controls (+/-)
- Remove item button
- Clear cart button
- Order summary
- Empty cart state
- Continue shopping link

**State**: From CartContext

- `cartItems` - Array of cart items
- `removeFromCart(id)` - Function
- `updateQuantity(id, qty)` - Function
- `clearCart()` - Function
- `getCartTotal()` - Function

---

### 5. **NotFoundPage.jsx**

```jsx
Route: *
```

**Purpose**: 404 error page  
**Features**:

- 404 illustration
- Error message
- Navigation links
- Back to home button
- Go to products button

**Props**: None

---

## 🔄 Context (src/context/)

### **CartContext.jsx**

```jsx
import { useCart } from "./context/CartContext";
```

**Purpose**: Global state management untuk shopping cart

**Provider**:

```jsx
<CartProvider>{children}</CartProvider>
```

**Hook Usage**:

```jsx
const {
  cartItems, // Array: Current cart items
  addToCart, // Function: (product) => void
  removeFromCart, // Function: (productId) => void
  updateQuantity, // Function: (productId, quantity) => void
  clearCart, // Function: () => void
  getCartTotal, // Function: () => number
  getCartCount, // Function: () => number
} = useCart();
```

**Features**:

- LocalStorage sync
- Automatic quantity handling
- Total calculation
- Item count calculation

---

## 🔧 Services (src/services/)

### **api.js**

```jsx
import { productService } from "./services/api";
```

**Methods**:

```javascript
// Get all products
await productService.getAllProducts();

// Get single product by ID
await productService.getProductById(id);

// Get all categories
await productService.getCategories();

// Get products by category
await productService.getProductsByCategory(category);

// Get limited products
await productService.getLimitedProducts(limit);
```

**Base Configuration**:

- Base URL: `https://fakestoreapi.com`
- Timeout: 10 seconds
- Uses Axios

---

## 🪝 Custom Hooks (src/hooks/)

### 1. **useFetch.js**

```jsx
import useFetch from "./hooks/useFetch";

const { data, loading, error, refetch } = useFetch(
  () => productService.getAllProducts(),
  [] // dependencies
);
```

**Returns**:

- `data` - Fetched data
- `loading` - Loading state
- `error` - Error message or null
- `refetch` - Function to refetch

---

### 2. **useLocalStorage.js**

```jsx
import useLocalStorage from "./hooks/useLocalStorage";

const [value, setValue, removeValue] = useLocalStorage("key", initialValue);
```

**Returns**:

- `value` - Current value
- `setValue` - Set new value
- `removeValue` - Remove from localStorage

---

## 🛠️ Utils (src/utils/)

### 1. **constants.js**

```jsx
import {
  API_BASE_URL,
  COLORS,
  MESSAGES,
  CATEGORIES,
  API_ENDPOINTS,
} from "./utils/constants";
```

**Exports**:

- `API_BASE_URL` - API base URL
- `APP_NAME` - App name
- `STORAGE_KEYS` - LocalStorage keys
- `COLORS` - Theme colors
- `CATEGORIES` - Product categories
- `API_ENDPOINTS` - API endpoint functions
- `DEFAULTS` - Default values
- `MESSAGES` - UI messages

---

### 2. **helpers.js**

```jsx
import {
  formatCurrency,
  truncateText,
  capitalizeFirstLetter,
  scrollToTop,
} from "./utils/helpers";
```

**Functions**:

- `formatCurrency(amount)` - Format to USD
- `truncateText(text, length)` - Truncate text
- `capitalizeFirstLetter(str)` - Capitalize
- `formatCategory(category)` - Format category name
- `calculateDiscount(original, sale)` - Calculate discount %
- `debounce(func, delay)` - Debounce function
- `isObjectEmpty(obj)` - Check if empty
- `generateId()` - Generate unique ID
- `scrollToTop()` - Scroll to page top
- `getRatingStars(rating)` - Get star array

---

## 📊 Component Hierarchy

```
App.jsx
├── CartProvider (Context)
│   ├── Navbar
│   ├── Routes
│   │   ├── HomePage
│   │   │   ├── ProductCard (x8)
│   │   │   └── Loading/ErrorMessage
│   │   ├── ProductsPage
│   │   │   ├── ProductCard (multiple)
│   │   │   └── Loading/ErrorMessage
│   │   ├── ProductDetailPage
│   │   │   └── Loading/ErrorMessage
│   │   ├── CartPage
│   │   └── NotFoundPage
│   └── Footer
```

---

## 🔗 Component Dependencies

### Dependencies by Component

**Navbar**

- React Router: `Link`
- Context: `useCart`

**ProductCard**

- React Router: `Link`

**HomePage**

- Services: `productService`
- Components: `ProductCard`, `Loading`, `ErrorMessage`
- React Router: `Link`

**ProductsPage**

- Services: `productService`
- Components: `ProductCard`, `Loading`, `ErrorMessage`

**ProductDetailPage**

- Services: `productService`
- Context: `useCart`
- Components: `Loading`, `ErrorMessage`
- React Router: `useParams`, `Link`

**CartPage**

- Context: `useCart`
- React Router: `Link`

---

## 💡 Usage Examples

### Example 1: Using ProductCard

```jsx
import ProductCard from "./components/ProductCard";

const products = [
  /* product array */
];

<div className="grid grid-cols-4 gap-6">
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>;
```

### Example 2: Using Cart Context

```jsx
import { useCart } from "./context/CartContext";

function MyComponent() {
  const { addToCart, cartItems, getCartTotal } = useCart();

  const handleAdd = (product) => {
    addToCart(product);
  };

  return (
    <div>
      <button onClick={() => handleAdd(product)}>Add to Cart</button>
      <p>Total: ${getCartTotal()}</p>
      <p>Items: {cartItems.length}</p>
    </div>
  );
}
```

### Example 3: Using API Service

```jsx
import { productService } from "./services/api";
import { useEffect, useState } from "react";

function MyComponent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return <div>{/* render products */}</div>;
}
```

---

**Note**: Semua komponen sudah fully functional dan siap digunakan!
