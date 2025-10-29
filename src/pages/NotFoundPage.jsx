import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-4xl font-semibold text-charcoal mb-4">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-xl text-charcoal-light mb-8">
            Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/" className="btn-primary">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Kembali ke Beranda</span>
            </span>
          </Link>

          <Link to="/products" className="btn-secondary">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span>Lihat Produk</span>
            </span>
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-charcoal-light mb-4">Atau coba navigasi berikut:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="text-primary hover:text-primary-dark font-medium">
              Beranda
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/products" className="text-primary hover:text-primary-dark font-medium">
              Semua Produk
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/cart" className="text-primary hover:text-primary-dark font-medium">
              Keranjang Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
