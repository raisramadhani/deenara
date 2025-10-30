# Deenara E-Commerce

Modern e-commerce web application dengan React, Tailwind CSS, dan Google Authentication.

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![React](https://img.shields.io/badge/react-19.1.1-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## eatures

### Core Features

- **Product Catalog** - Browse products dengan search & filter
- **Shopping Cart** - Add to cart dengan quantity management
- **Product Details** - Detailed product information & reviews
- **Currency Support** - Indonesian Rupiah (IDR) formatting
- **Responsive Design** - Mobile, tablet, dan desktop optimized

### Authentication

- **Google Sign-In** - One-click login dengan Google account
- **User Profile** - Display user info di navbar
- **Protected Routes** - Route protection untuk authenticated users
- **Session Persistence** - Auto-login dengan JWT tokens
- **Logout** - Secure logout functionality

### UI/UX

- **Modern Design** - Arctic Blue & Charcoal color scheme
- **Smooth Animations** - Transitions dan hover effects
- **SEO Friendly** - Meta tags dan semantic HTML
- **Fast Performance** - Optimized dengan Vite

## Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **Database**: Neon.tech (PostgreSQL)
- **Authentication**: Google OAuth 2.0 + JWT
- **API**: FakeStore API
- **Deployment**: Vercel

## Installation

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

## Development

```bash
# Start development server
npm run dev:full

# Initialize database (first time only)
# Open: http://localhost:5173/api/auth/init-db

# App will run at: http://localhost:5173
```

## Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Quick Start with Authentication

1. **Setup Google OAuth**

   - Create project di [Google Cloud Console](https://console.cloud.google.com)
   - Enable Google+ API
   - Create OAuth 2.0 Client ID
   - Copy Client ID

2. **Setup Neon Database**

   - Create account di [Neon.tech](https://neon.tech)
   - Create database project
   - Copy connection string

3. **Configure Environment**

   ```bash
   cp .env.example .env
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

---
