const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/**
 * Formats a number as a currency string (USD).
 * Optimization: Uses a globally cached Intl.NumberFormat instance
 * instead of instantiating a new one on every call, which is a
 * significant performance bottleneck in JavaScript.
 */
export const formatCurrency = (amount: number): string => {
  return currencyFormatter.format(amount);
};
