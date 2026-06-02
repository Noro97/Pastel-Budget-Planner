export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

export const formatCurrency = (amount: number) => {
  return currencyFormatter.format(amount);
};

export const formatDate = (dateString: string) => {
  return dateFormatter.format(new Date(dateString));
};

export const formatShortDate = (dateString: string) => {
  return shortDateFormatter.format(new Date(dateString));
};
