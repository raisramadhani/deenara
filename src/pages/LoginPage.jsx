import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function LoginPage() {
  const { loginWithGoogle, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [googleLoaded, setGoogleLoaded] = useState(false);

  const from = location.state?.from?.pathname || '/';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, from]);

  // Load Google Sign-In script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize Google Sign-In
  useEffect(() => {
    if (!googleLoaded || !window.google) return;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    if (!clientId) {
      console.error('Google Client ID not found. Please set VITE_GOOGLE_CLIENT_ID in .env');
      return;
    }

    // Check if button container exists
    const buttonContainer = document.getElementById('google-signin-button');
    if (!buttonContainer) {
      console.error('Google button container not found');
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      window.google.accounts.id.renderButton(
        buttonContainer,
        {
          theme: 'filled_blue',
          size: 'large',
          text: 'continue_with',
          shape: 'pill',
          logo_alignment: 'left',
          width: 280,
        }
      );
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
    }
  }, [googleLoaded]);

  const handleGoogleResponse = async (response) => {
    try {
      const result = await loginWithGoogle(response.credential);
      
      if (result.success) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Error handling Google response:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-light to-arctic">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto"></div>
          <p className="mt-4 text-white font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-arctic">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center space-x-2 text-white hover:text-white/80 transition-all duration-300 z-50 group backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
      >
        <svg
          className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="font-medium">Kembali ke Beranda</span>
      </Link>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-md w-full">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Deenara" 
                  className="h-16 brightness-0 invert drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-white blur-xl opacity-30 animate-pulse-slow"></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
              Selamat Datang Kembali!
            </h1>
            <p className="text-white/90 text-lg">
              Masuk untuk melanjutkan pengalaman berbelanja Anda
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-500/20 backdrop-blur-sm border border-red-300/30 rounded-2xl p-4 animate-shake">
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 text-white flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="ml-3 text-white font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Login Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col items-center space-y-6">
              {/* Sign In Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-arctic rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <svg
                  className="h-10 w-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-charcoal mb-2">
                  Masuk dengan Google
                </h2>
                <p className="text-gray-600">
                  Autentikasi cepat dan aman
                </p>
              </div>

              {/* Google Sign-In Button */}
              <div className="w-full flex justify-center pt-2">
                <div id="google-signin-button"></div>
              </div>

              {!googleLoaded && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                  <span className="text-sm">Memuat Google Sign-In...</span>
                </div>
              )}

              {/* Divider */}
              <div className="w-full relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-sm font-medium text-gray-500">
                    Mengapa harus masuk?
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="w-full space-y-3">
                <div className="flex items-center space-x-3 text-gray-700 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">Simpan item favorit Anda</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">Lacak pesanan dengan mudah</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">Proses checkout lebih cepat</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <p className="mt-6 text-center text-sm text-white/80">
            Dengan masuk, Anda menyetujui{' '}
            <a href="#" className="font-semibold text-white hover:underline">
              Syarat Layanan
            </a>{' '}
            dan{' '}
            <a href="#" className="font-semibold text-white hover:underline">
              Kebijakan Privasi
            </a>{' '}
            kami
          </p>
        </div>
      </div>
    </div>
  );
}
