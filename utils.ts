// Optimization: Cache Intl.NumberFormat instance globally to avoid expensive
// instantiation on every component render or inside loops.
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (amount: number) => {
  return currencyFormatter.format(amount);
};
