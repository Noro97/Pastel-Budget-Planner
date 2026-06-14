// Optimization: Cache Intl formatters to prevent expensive O(N) recreations during renders and loops
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

const defaultDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

// A fallback format that matches the default string output of .toLocaleDateString()
// without options
const localDateFormatter = new Intl.DateTimeFormat('en-US');

export const formatCurrency = (amount: number) => {
  return currencyFormatter.format(amount);
};

export const formatShortDate = (dateString: string) => {
  return shortDateFormatter.format(new Date(dateString));
};

export const formatDate = (dateString: string) => {
  return defaultDateFormatter.format(new Date(dateString));
};

export const formatLocalDate = (dateString: string) => {
  return localDateFormatter.format(new Date(dateString));
};
