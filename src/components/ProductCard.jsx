import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/helpers';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-4 relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-300"></div>
      </div>
      <div className="p-4">
        <h3 className="text-charcoal font-medium text-sm line-clamp-2 mb-2 min-h-[2.5rem] group-hover:text-primary transition-colors duration-300">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold text-lg group-hover:scale-110 inline-block transition-transform duration-300">
            {formatCurrency(product.price)}
          </span>
          <div className="flex items-center text-xs text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-400 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{product.rating?.rate || 'N/A'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
