const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/**
 * Format an amount as USD currency
 * Uses a cached Intl.NumberFormat instance for performance
 */
export const formatCurrency = (amount: number): string => {
  return currencyFormatter.format(amount);
};
