const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const dateWithYearFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const dateWithoutYearFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

const defaultDateFormatter = new Intl.DateTimeFormat('en-US');

export const formatCurrency = (amount: number): string => {
  return currencyFormatter.format(amount);
};

export const formatDateWithYear = (date: string | number | Date): string => {
  return dateWithYearFormatter.format(new Date(date));
};

export const formatDateWithoutYear = (date: string | number | Date): string => {
  return dateWithoutYearFormatter.format(new Date(date));
};

export const formatDefaultDate = (date: string | number | Date): string => {
  return defaultDateFormatter.format(new Date(date));
};
