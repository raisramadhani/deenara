import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import UserAvatar from './UserAvatar';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const cartCount = getCartCount();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      setShowUserMenu(false);
      navigate('/');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white shadow-lg backdrop-blur-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center group relative">
            <img 
              src="/logo.png" 
              alt="Deenara" 
              className={`object-contain group-hover:scale-110 transition-all duration-300 ${
                isScrolled ? 'h-8' : 'h-10 brightness-0 invert'
              }`}
            />
            {/* Glow effect on logo */}
            <div className={`absolute inset-0 bg-primary blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
              !isScrolled && 'group-hover:opacity-50'
            }`}></div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-all duration-300 font-medium relative group pb-1 ${
                isScrolled 
                  ? 'text-charcoal hover:text-primary' 
                  : 'text-white hover:text-gray-200'
              }`}
            >
              <span className="relative z-10">Beranda</span>
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                isScrolled ? 'bg-primary' : 'bg-white'
              }`}></span>
            </Link>
            <Link
              to="/products"
              className={`transition-all duration-300 font-medium relative group pb-1 ${
                isScrolled 
                  ? 'text-charcoal hover:text-primary' 
                  : 'text-white hover:text-gray-200'
              }`}
            >
              <span className="relative z-10">Produk</span>
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                isScrolled ? 'bg-primary' : 'bg-white'
              }`}></span>
            </Link>
            <Link
              to="/about"
              className={`transition-all duration-300 font-medium relative group pb-1 ${
                isScrolled 
                  ? 'text-charcoal hover:text-primary' 
                  : 'text-white hover:text-gray-200'
              }`}
            >
              <span className="relative z-10">Tentang Kami</span>
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                isScrolled ? 'bg-primary' : 'bg-white'
              }`}></span>
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                    isScrolled 
                      ? 'hover:bg-gray-100' 
                      : 'hover:bg-white/20 backdrop-blur-sm'
                  }`}
                >
                  <UserAvatar user={user} size="md" />
                  <span className={`hidden md:block font-medium ${
                    isScrolled ? 'text-charcoal' : 'text-white'
                  }`}>
                    {user?.name?.split(' ')[0]}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      showUserMenu ? 'rotate-180' : ''
                    } ${isScrolled ? 'text-charcoal' : 'text-white'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'bg-white text-charcoal hover:bg-gray-100'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span>Login</span>
              </Link>
            )}

            <Link
              to="/cart"
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group ${
                isScrolled 
                  ? 'hover:bg-gray-100' 
                  : 'hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 group-hover:scale-110 transition-all duration-300 ${
                  isScrolled 
                    ? 'text-charcoal group-hover:text-primary' 
                    : 'text-white group-hover:text-gray-200'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className={`transition-colors duration-300 ${
              isScrolled ? 'text-charcoal hover:text-primary' : 'text-white hover:text-gray-200'
            }`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
