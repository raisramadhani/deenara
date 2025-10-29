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

## 🏃 Development

```bash
# Start development server
npm run dev:full

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
