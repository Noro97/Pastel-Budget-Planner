/**
 * Cached Intl.NumberFormat instance for USD currency formatting.
 * Reusing this instance prevents the expensive O(N) cost of re-instantiating
 * Intl.NumberFormat inside loops or render cycles.
 */
const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/**
 * Formats a number as USD currency.
 */
export const formatCurrency = (amount: number): string => {
  return usdFormatter.format(amount);
};
