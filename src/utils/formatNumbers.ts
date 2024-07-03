export function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + 'm';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'k';
  } else {
    return num.toString();
  }
}

export function formatDate(date: Date) {
  const Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const publishingDate = new Date(date);
  const publishingText = `${publishingDate.getDate()} ${
    Months[publishingDate.getMonth()]
  } at ${publishingDate.getHours()}:${publishingDate.getMinutes()}`;

  return publishingText;
}
