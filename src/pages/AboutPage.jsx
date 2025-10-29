import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const AboutPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Company Story */}
          <div className="mb-16">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
              <h2 className="text-3xl font-bold text-charcoal mb-6">
                Cerita Kami
              </h2>
              <div className="space-y-4 text-charcoal-light leading-relaxed">
                <p>
                  Deenara didirikan dengan visi untuk membawa pengalaman berbelanja online yang mudah, 
                  aman, dan menyenangkan bagi semua orang. Kami percaya bahwa setiap orang berhak 
                  mendapatkan akses ke produk-produk berkualitas dengan harga yang terjangkau.
                </p>
                <p>
                  Sejak awal, kami berkomitmen untuk menyediakan platform e-commerce yang tidak hanya 
                  menawarkan berbagai pilihan produk, tetapi juga memberikan pengalaman berbelanja yang 
                  personal dan memuaskan. Dari elektronik hingga fashion, dari peralatan rumah tangga 
                  hingga aksesoris, kami menghadirkan beragam kategori produk untuk memenuhi kebutuhan 
                  sehari-hari Anda.
                </p>
                <p>
                  Tim kami terdiri dari para profesional yang berdedikasi untuk memberikan layanan 
                  terbaik kepada pelanggan. Kami terus berinovasi dan meningkatkan platform kami 
                  untuk memastikan pengalaman berbelanja yang lancar dan memuaskan.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal text-center mb-12">
              Nilai-Nilai Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Value 1 */}
              <div className="bg-white rounded-lg shadow-sm p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  Kualitas Terjamin
                </h3>
                <p className="text-charcoal-light">
                  Kami hanya menyediakan produk berkualitas tinggi dari brand terpercaya 
                  untuk kepuasan pelanggan.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-white rounded-lg shadow-sm p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  Harga Terbaik
                </h3>
                <p className="text-charcoal-light">
                  Dapatkan produk favorit Anda dengan harga kompetitif dan penawaran 
                  menarik setiap harinya.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-white rounded-lg shadow-sm p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  Kepuasan Pelanggan
                </h3>
                <p className="text-charcoal-light">
                  Pelanggan adalah prioritas utama kami. Kepuasan Anda adalah kebahagiaan kami.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-lg p-8 md:p-12 text-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
                  <div className="text-gray-100">Produk</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
                  <div className="text-gray-100">Pelanggan</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
                  <div className="text-gray-100">Transaksi</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">4.8</div>
                  <div className="text-gray-100">Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-4">Misi Kami</h3>
                <p className="text-charcoal-light leading-relaxed">
                  Menyediakan platform e-commerce yang user-friendly, aman, dan terpercaya 
                  untuk memudahkan masyarakat dalam berbelanja online. Kami berkomitmen 
                  untuk terus berinovasi dan memberikan nilai terbaik kepada pelanggan.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-4">Visi Kami</h3>
                <p className="text-charcoal-light leading-relaxed">
                  Menjadi platform e-commerce pilihan utama di Indonesia yang dikenal 
                  dengan kualitas produk, layanan prima, dan pengalaman berbelanja yang 
                  luar biasa. Kami ingin menjadi bagian dari kehidupan sehari-hari pelanggan.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-charcoal mb-4">
                Siap Untuk Mulai Berbelanja?
              </h2>
              <p className="text-charcoal-light mb-8 text-lg">
                Jelajahi ribuan produk berkualitas dan temukan yang Anda butuhkan
              </p>
              <Link
                to="/products"
                className="btn-primary inline-flex items-center space-x-2 text-lg"
              >
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span>Mulai Belanja Sekarang</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
