const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/**
 * Formats a number as USD currency.
 * Uses a cached Intl.NumberFormat instance for performance optimization.
 * @param amount The number to format
 * @returns The formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return currencyFormatter.format(amount);
};
