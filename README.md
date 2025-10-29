# 🛍️ Deenara E-Commerce

Modern e-commerce web application dengan React, Tailwind CSS, dan Google Authentication.

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![React](https://img.shields.io/badge/react-19.1.1-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### Core Features

- 🛍️ **Product Catalog** - Browse products dengan search & filter
- 🛒 **Shopping Cart** - Add to cart dengan quantity management
- ⭐ **Product Details** - Detailed product information & reviews
- 💰 **Currency Support** - Indonesian Rupiah (IDR) formatting
- 📱 **Responsive Design** - Mobile, tablet, dan desktop optimized

### 🔐 Authentication (NEW in v1.1.0)

- 🔑 **Google Sign-In** - One-click login dengan Google account
- 👤 **User Profile** - Display user info di navbar
- 🔒 **Protected Routes** - Route protection untuk authenticated users
- 💾 **Session Persistence** - Auto-login dengan JWT tokens
- 🚪 **Logout** - Secure logout functionality

### UI/UX

- 🎨 **Modern Design** - Arctic Blue & Charcoal color scheme
- ✨ **Smooth Animations** - Transitions dan hover effects
- 🌐 **SEO Friendly** - Meta tags dan semantic HTML
- ⚡ **Fast Performance** - Optimized dengan Vite

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **Database**: Neon.tech (PostgreSQL)
- **Authentication**: Google OAuth 2.0 + JWT
- **API**: FakeStore API
- **Deployment**: Vercel

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/yourusername/deenara.git

# Navigate to project
cd deenara

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dengan credentials Anda (lihat AUTH_QUICKSTART.md)
```

## 🔧 Configuration

### Required Environment Variables

```env
# Frontend (Vite)
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
VITE_API_URL=/api

# Backend (Vercel)
DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require
JWT_SECRET=your-super-secret-key-min-32-chars
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
FRONTEND_URL=https://your-domain.vercel.app
NODE_ENV=production
```

**📚 Setup Guide**: See [AUTH_QUICKSTART.md](./AUTH_QUICKSTART.md) or [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md) for detailed setup instructions.

## 🏃 Development

```bash
# Start development server
npm run dev

# Initialize database (first time only)
# Open: http://localhost:5173/api/auth/init-db

# App will run at: http://localhost:5173
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**📋 Deployment Guide**: See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for complete deployment steps.

## 📚 Documentation

| File                                                     | Description                             |
| -------------------------------------------------------- | --------------------------------------- |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | 📋 Overview implementasi authentication |
| [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md)     | 🔐 Panduan lengkap setup Google OAuth   |
| [AUTH_QUICKSTART.md](./AUTH_QUICKSTART.md)               | ⚡ Quick reference setup                |
| [TESTING_GUIDE.md](./TESTING_GUIDE.md)                   | 🧪 Testing procedures                   |
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)     | ✅ Pre/post deployment checklist        |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)           | 📁 Project organization                 |
| [CHANGELOG.md](./CHANGELOG.md)                           | 📝 Version history                      |

## 🎯 Quick Start with Authentication

1. **Setup Google OAuth** (5 minutes)

   - Create project di [Google Cloud Console](https://console.cloud.google.com)
   - Enable Google+ API
   - Create OAuth 2.0 Client ID
   - Copy Client ID

2. **Setup Neon Database** (3 minutes)

   - Create account di [Neon.tech](https://neon.tech)
   - Create database project
   - Copy connection string

3. **Configure Environment**

   ```bash
   cp .env.example .env
   # Edit .env dengan Google Client ID dan Neon connection string
   ```

4. **Run Application**

   ```bash
   npm install
   npm run dev
   ```

5. **Initialize Database**

   - Open: `http://localhost:5173/api/auth/init-db`

6. **Test Login**
   - Open: `http://localhost:5173/login`
   - Click "Sign in with Google"

**📖 Detailed Guide**: [AUTH_QUICKSTART.md](./AUTH_QUICKSTART.md)

## 🔐 API Endpoints

| Endpoint            | Method | Description                  |
| ------------------- | ------ | ---------------------------- |
| `/api/auth/login`   | POST   | Login with Google credential |
| `/api/auth/logout`  | POST   | Logout current user          |
| `/api/auth/me`      | GET    | Get current user info        |
| `/api/auth/init-db` | GET    | Initialize database tables   |

## 💻 Usage Examples

### Check Authentication Status

```jsx
import { useAuth } from "./context/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? <p>Welcome, {user.name}!</p> : <p>Please login</p>}
    </div>
  );
}
```

### Protected Routes

```jsx
import ProtectedRoute from "./components/ProtectedRoute";

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>;
```

## 🗂️ Project Structure

```
deenara/
├── api/                    # Backend API (Vercel Functions)
│   ├── auth/              # Authentication endpoints
│   ├── db.js              # Database queries
│   └── auth-utils.js      # JWT utilities
├── src/
│   ├── components/        # React components
│   ├── context/          # State management (Auth, Cart)
│   ├── pages/            # Route pages
│   ├── services/         # API services
│   └── utils/            # Helper functions
└── Documentation files
```

**📂 Full Structure**: See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

## 🧪 Testing

```bash
# Run tests locally
npm run dev

# Test authentication flow
# 1. Open http://localhost:5173/login
# 2. Click "Sign in with Google"
# 3. Verify user info in Navbar
# 4. Test logout
```

**🔬 Testing Guide**: See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive testing procedures.

## 📸 Screenshots

- Homepage dengan featured products
- Product listing dengan filter
- Product detail page
- Shopping cart
- Login page dengan Google Sign-In
- User profile di Navbar

## 🔒 Security

- ✅ JWT authentication dengan 7-day expiration
- ✅ HttpOnly cookies untuk production
- ✅ CORS configuration
- ✅ Environment variables untuk sensitive data
- ✅ Token verification pada setiap request
- ✅ Google OAuth 2.0 secure flow

## 🐛 Troubleshooting

### Common Issues:

- **Google Sign-In tidak muncul**: Check VITE_GOOGLE_CLIENT_ID di .env
- **Database error**: Verify DATABASE_URL format
- **CORS error**: Check FRONTEND_URL setting
- **Token invalid**: Verify Google OAuth settings

**🔍 Full Troubleshooting**: See documentation files above.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Deenara Team** - Initial work

## 🙏 Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) - Product data
- [Neon.tech](https://neon.tech) - Serverless PostgreSQL
- [Vercel](https://vercel.com) - Hosting & deployment
- [Google](https://developers.google.com/identity) - OAuth authentication
- [Tailwind CSS](https://tailwindcss.com) - Styling framework

## 📞 Support

Need help? Check our documentation:

- Start with [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- For setup: [AUTH_QUICKSTART.md](./AUTH_QUICKSTART.md)
- For issues: [TESTING_GUIDE.md](./TESTING_GUIDE.md)

## 🗺️ Roadmap

- [x] Google Authentication
- [x] User profile display
- [x] Protected routes
- [ ] User profile page
- [ ] Order history
- [ ] Wishlist feature
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Payment integration

---

**Made with ❤️ using React + Vite + Tailwind CSS**
