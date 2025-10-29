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
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: 350,
        }
      );
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
    }
  }, [googleLoaded]);

  const handleGoogleResponse = async (response) => {
    try {
      console.log('Google response received');
      const result = await loginWithGoogle(response.credential);
      
      if (result.success) {
        console.log('Login successful, navigating...');
        navigate(from, { replace: true });
      } else {
        console.error('Login failed:', result.error);
      }
    } catch (error) {
      console.error('Error handling Google response:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center">
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
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
              continue shopping
            </Link>
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
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
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-sm text-gray-600 mb-2">
                Sign in with your Google account
              </div>
              <div id="google-signin-button"></div>
              {!googleLoaded && (
                <div className="text-sm text-gray-500">Loading Google Sign-In...</div>
              )}
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Features</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
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
                  Save your cart items
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
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
                  Track your orders
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
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
                  Faster checkout
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-center text-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
