// ⚡ Bolt Performance Optimization:
// Instantiating `Intl` formatters (like Intl.NumberFormat and Intl.DateTimeFormat)
// is computationally expensive. We cache them globally here and reuse instances
// instead of re-instantiating them inside React render cycles or list iterations,
// drastically improving render performance.

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const dateShortFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

const dateFullFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export const formatCurrency = (amount: number) => currencyFormatter.format(amount);

export const formatDateShort = (dateString: string) =>
  dateShortFormatter.format(new Date(dateString));

export const formatDateFull = (dateString: string) =>
  dateFullFormatter.format(new Date(dateString));
