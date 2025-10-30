import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { USER_ROLES } from '../utils/constants';

export default function LoginPage() {
  const { loginWithGoogle, loginWithEmail, isAuthenticated, user, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const redirectUser = (userRole) => {
    const destination = userRole === USER_ROLES.ADMIN ? '/admin/dashboard' : from;
    navigate(destination, { replace: true });
  };

  useEffect(() => {
    if (isAuthenticated && !loading && user) {
      redirectUser(user.role);
    }
  }, [isAuthenticated, loading, user, navigate, from]);

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

  useEffect(() => {
    if (!googleLoaded || !window.google) return;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!clientId) {
      return;
    }

    const buttonContainer = document.getElementById('google-signin-button');
    if (!buttonContainer) {
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

    }
  }, [googleLoaded]);

  const handleGoogleResponse = async (response) => {
    try {
      const result = await loginWithGoogle(response.credential);

      if (result.success) {
        redirectUser(result.user?.role);
      }
    } catch (error) {

    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.email || !formData.password) {
      setFormError('Email and password are required');
      return;
    }

    try {
      setFormLoading(true);
      const result = await loginWithEmail(formData.email, formData.password);

      if (result.success) {
        redirectUser(result.user?.role);
      } else {
        setFormError(result.error || 'Login failed');
      }
    } catch (error) {
      setFormError('An error occurred during login');
    } finally {
      setFormLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFormError('');
  };

  const handleQuickLoginAdmin = async () => {
    setFormError('');
    setFormLoading(true);

    try {
      const result = await loginWithEmail('test@example.com', 'password');

      if (result.success) {
        redirectUser(result.user?.role);
      } else {
        setFormError(result.error || 'Quick login failed');
      }
    } catch (error) {
      setFormError('An error occurred during quick login');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-light to-arctic">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto"></div>
          <p className="mt-4 text-white font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-arctic">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

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
        <span className="font-medium">Back to Home</span>
      </Link>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-md w-full">

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
              Welcome Back!
            </h1>
            <p className="text-white/90 text-lg">
              Sign in to continue your shopping experience
            </p>
          </div>

          {(error || formError) && (
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
                    s />
                </svg>
                <p className="ml-3 text-white font-medium">{error || formError}</p>
              </div>
            </div>
          )}

          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col items-center space-y-6">

              <div className="w-20 h-20 bg-gradient-to-br from-primary to-arctic rounded-2xl flex items-center justify-center shadow-lg">
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
                  Sign in to Your Account
                </h2>
                <p className="text-gray-600">
                  Choose your preferred login method
                </p>
              </div>
              <div className="w-full">
                <button
                  type="button"
                  onClick={handleQuickLoginAdmin}
                  disabled={formLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 border-2 border-orange-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Quick Login as Test Admin</span>
                </button>
              </div>
              
              <form onSubmit={handleEmailLogin} className="w-full space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    s onChange={handleInputChange}
                    placeholder="name@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 outline-none"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    s className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 outline-none"
                    autoComplete="current-password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full bg-gradient-to-r from-primary to-arctic text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {formLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign in with Email</span>
                    </>
                  )}
                </button>
              </form>

              <div className="w-full relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-sm font-medium text-gray-500">
                    or
                  </span>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <div id="google-signin-button"></div>
              </div>

              {!googleLoaded && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                  <span className="text-sm">Loading Google Sign-In...</span>
                </div>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-white/80">
            By signing in, you agree to our{' '}
            <a href="#" className="font-semibold text-white hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-semibold text-white hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}