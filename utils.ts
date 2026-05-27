// Optimization: Cache Intl.NumberFormat instance globally
// Instantiating Intl.NumberFormat is expensive in JavaScript.
// By hoisting it outside of components/loops, we avoid O(N) reallocation cost.
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (amount: number) => {
  return currencyFormatter.format(amount);
};
