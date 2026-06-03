// ⚡ Bolt Optimization: Instantiating `Intl.NumberFormat` is a highly expensive O(1) operation
// in JavaScript. By caching the formatter instance globally here, we avoid recreating it
// repeatedly inside component render functions and loops, significantly reducing
// memory allocation and CPU overhead during format operations.
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (amount: number) => {
  return currencyFormatter.format(amount);
};
