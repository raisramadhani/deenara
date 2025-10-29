import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [isScrolled, setIsScrolled] = useState(false);

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
