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

export default {
  USD_TO_IDR_RATE,
  formatCurrency,
};
