const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/**
 * Formats a number as a USD currency string.
 * Uses a cached Intl.NumberFormat instance for performance,
 * avoiding expensive re-instantiation on every render.
 */
export const formatCurrency = (amount: number): string => {
  return currencyFormatter.format(amount);
};
