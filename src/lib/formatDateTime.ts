export const formatDateTime = (date: Date | string) => {
  const value = new Date(date);

  const datePart = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(value);

  const timePart = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(value);

  return `${datePart}\n${timePart}`;
};
