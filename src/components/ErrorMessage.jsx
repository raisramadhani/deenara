const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-red-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-charcoal mb-2">Terjadi Kesalahan</h3>
        <p className="text-charcoal-light">{message || 'Tidak dapat memuat data. Silakan coba lagi nanti.'}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 btn-primary"
        >
          Muat Ulang
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
