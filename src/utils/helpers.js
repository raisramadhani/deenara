/**
 * Exchange rate USD to IDR
 */
export const USD_TO_IDR_RATE = 16620;

/**
 * Format currency to IDR (Rupiah)
 * @param {number} amount - Amount in USD to convert and format
 * @returns {string} Formatted currency string in Rupiah
 */
export const formatCurrency = (amount) => {
  const idrAmount = amount * USD_TO_IDR_RATE;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(idrAmount);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format category name for display
 * @param {string} category - Category string
 * @returns {string} Formatted category
 */
export const formatCategory = (category) => {
  return category
    .split("-")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} salePrice - Sale price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (originalPrice, salePrice) => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} True if empty
 */
export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Scroll to top of page
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/**
 * Get rating stars array
 * @param {number} rating - Rating value
 * @returns {Array} Array of star states
 */
export const getRatingStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push("full");
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }
  return stars;
};

export default {
  USD_TO_IDR_RATE,
  formatCurrency,
  truncateText,
  capitalizeFirstLetter,
  formatCategory,
  calculateDiscount,
  debounce,
  isObjectEmpty,
  generateId,
  scrollToTop,
  getRatingStars,
};
