import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleGenAI } from "@google/genai";

const API_BASE_URL = 'https://fakestoreapi.com';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export default function DashboardPage() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: 'electronics'
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadMode, setUploadMode] = useState('url'); 
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/', { replace: true });
    }
  }, [isAdmin, navigate]);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const openCreateModal = () => {
    setModalMode('create');
    setFormData({
      title: '',
      price: '',
      description: '',
      image: '',
      category: 'electronics'
    });
    setImageFile(null);
    setImagePreview('');
    setUploadMode('url');
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const openEditModal = (product) => {
    setModalMode('edit');
    setSelectedProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category
    });
    setImageFile(null);
    setImagePreview(product.image);
    setUploadMode('url');
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setImageFile(null);
    setImagePreview('');
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;
    return 'https://fakestoreapi.com/img/placeholder.jpg';
  };

  const handleGenerateAI = async () => {
    if (!imagePreview) {
      setError('Please upload or enter an image first');
      return;
    }

    setGenerating(true);
    setError('');

    try {
      const prompt = `Analyze this product image and generate the following in English:
1. Product title (short and descriptive)
2. Price in USD (realistic estimate)
3. Category (choose from: electronics, jewelery, men's clothing, women's clothing)
4. Detailed product description

Format your response as JSON:
{
  "title": "product title",
  "price": "price number only",
  "category": "category",
  "description": "detailed description"
}`;

      let imageData = imagePreview;
      
      if (imagePreview.startsWith('http')) {
        try {
          const response = await fetch(imagePreview);
          const blob = await response.blob();
          imageData = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
        } catch (err) {
          console.error('Error converting URL to base64:', err);
        }
      }

      const base64Data = imageData.split(',')[1];

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: base64Data
                }
              }
            ]
          }
        ]
      });

      const text = response.text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const generated = JSON.parse(jsonMatch[0]);
        setFormData({
          ...formData,
          title: generated.title || '',
          price: generated.price || '',
          category: generated.category || 'electronics',
          description: generated.description || ''
        });
        setSuccess('AI generation successful!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to parse AI response');
      }
    } catch (err) {
      console.error('AI Generation Error:', err);
      setError('Failed to generate product info with AI');
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      let imageUrl = formData.image;

      if (uploadMode === 'file' && imageFile) {
        imageUrl = await handleImageUpload();
      }

      if (!imageUrl || imageUrl.startsWith('data:')) {
        imageUrl = 'https://fakestoreapi.com/img/placeholder.jpg';
      }

      const productData = {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        image: imageUrl,
        category: formData.category
      };

      if (modalMode === 'create') {
        const response = await axios.post(`${API_BASE_URL}/products`, productData);

        const newProduct = {
          ...response.data,
          image: imagePreview || imageUrl
        };
        setProducts([newProduct, ...products]);
        setSuccess('Produk berhasil ditambahkan!');
      } else {
        const response = await axios.put(
          `${API_BASE_URL}/products/${selectedProduct.id}`,
          productData
        );
      
        const updatedProduct = {
          ...response.data,
          image: imagePreview || imageUrl
        };
        setProducts(
          products.map((p) => (p.id === selectedProduct.id ? updatedProduct : p))
        );
        setSuccess('Product updated successfully!');
      }

      setTimeout(() => {
        closeModal();
        setSaving(false);
      }, 1500);
    } catch (err) {
      console.error('Submit error:', err);
      setError('Failed to save product: ' + (err.response?.data?.message || err.message));
      setSaving(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/products/${productId}`);
      setProducts(products.filter((p) => p.id !== productId));
      setSuccess('Product deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="Deenara" className="h-10" />
              <div>
                <h1 className="text-2xl font-bold text-charcoal">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage Products</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-charcoal">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
               Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Messages */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Actions Bar */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-charcoal">
            Product List ({products.length})
          </h2>
          <button
            onClick={openCreateModal}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Product</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-charcoal line-clamp-2 mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 capitalize">
                  {product.category}
                </p>
                <p className="text-lg font-bold text-primary mb-4">
                  ${product.price}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(product)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={closeModal}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-charcoal">
                  {modalMode === 'create' ? 'Tambah Produk Baru' : 'Edit Produk'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {error && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-3 animate-fade-in">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-3 animate-fade-in">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{success}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Loading Overlay */}
                {saving && (
                  <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 rounded-2xl">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                      <p className="text-lg font-semibold text-charcoal">Saving Product...</p>
                      <p className="text-sm text-gray-600 mt-2">Please wait a moment</p>
                    </div>
                  </div>
                )}

                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  
                  {/* Upload Mode Toggle */}
                  <div className="flex space-x-4 mb-3">
                    <button
                      type="button"
                      onClick={() => setUploadMode('url')}
                      disabled={saving}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        uploadMode === 'url'
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode('file')}
                      disabled={saving}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        uploadMode === 'file'
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Upload File
                    </button>
                  </div>

                  {/* URL Input */}
                  {uploadMode === 'url' && (
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={(e) => {
                        handleInputChange(e);
                        setImagePreview(e.target.value);
                      }}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required={uploadMode === 'url'}
                    />
                  )}

                  {/* File Upload */}
                  {uploadMode === 'file' && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                        id="imageUpload"
                      />
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-sm text-gray-600">
                          {imageFile ? imageFile.name : 'Click to upload image'}
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-3 relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-contain bg-gray-100 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('');
                          setImageFile(null);
                          setFormData({ ...formData, image: '' });
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* AI Generate Button */}
                  {imagePreview && (
                    <>
                      <button
                      type="button"
                      onClick={handleGenerateAI}
                      disabled={generating || saving}
                      className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {generating ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Generate with AI</span>
                          </>
                        )}
                      </button>
                      {uploadMode === 'file' && (
                        <p className="mt-2 text-xs text-gray-500 text-center">
                          💡 Image preview will be stored locally. FakeStoreAPI has size limitations.
                        </p>
                      )}
                    </>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                   Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  ></textarea>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancle
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>{modalMode === 'create' ? 'Add Product' : 'Save Changes'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
