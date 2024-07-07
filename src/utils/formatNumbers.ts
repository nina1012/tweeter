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
  // if hour or minutes are less than 10, put 0 in front of them
  const hours =
    publishingDate.getHours() < 10
      ? `0${publishingDate.getHours()}`
      : publishingDate.getHours();
  const minutes =
    publishingDate.getMinutes() < 10
      ? `0${publishingDate.getMinutes()}`
      : publishingDate.getMinutes();
  const publishingText = `${publishingDate.getDate()} ${
    Months[publishingDate.getMonth()]
  } at ${hours}:${minutes}`;
  return publishingText;
}
