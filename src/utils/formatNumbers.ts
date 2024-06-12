export function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + 'm';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'k';
  } else {
    return num.toString();
  }
}
