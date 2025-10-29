import { useState, useEffect } from 'react';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productService.getAllProducts(),
          productService.getCategories(),
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-blue-900 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Decorative Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 opacity-20 animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div className="absolute bottom-10 left-20 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Semua Produk
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto">
              Jelajahi koleksi lengkap produk berkualitas tinggi dari berbagai kategori
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white text-charcoal hover:bg-gray-100 border border-border'
              }`}
            >
              Semua Produk
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 capitalize ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-charcoal hover:bg-gray-100 border border-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-charcoal-light">
            Menampilkan <span className="font-semibold text-charcoal">{filteredProducts.length}</span> produk
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-charcoal-light">
              Tidak ada produk dalam kategori ini
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
