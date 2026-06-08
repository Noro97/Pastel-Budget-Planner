// Globally cached Intl formatters for performance optimization
// Instantiating Intl objects is expensive; caching them improves render performance

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (amount: number): string => {
  return currencyFormatter.format(amount);
};

// For dates with month, day, year (e.g., "Jan 1, 2023")
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return dateFormatter.format(d);
};

// For dates with month and day only (e.g., "Jan 1")
const dateNoYearFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

export const formatDateNoYear = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return dateNoYearFormatter.format(d);
};

// For basic dates (e.g., "1/1/2023") - matches default toLocaleDateString()
const shortDateFormatter = new Intl.DateTimeFormat('en-US');

export const formatShortDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return shortDateFormatter.format(d);
};
