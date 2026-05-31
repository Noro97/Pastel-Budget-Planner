// Optimization: Cache Intl.NumberFormat instance globally
// Instantiating Intl.NumberFormat is highly expensive. Reusing a single instance
// prevents recreating it on every render or inside loops, significantly improving performance.
const USDFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (amount: number): string => {
  return USDFormatter.format(amount);
};
