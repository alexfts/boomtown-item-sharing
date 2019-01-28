export default function countDaysAgo(date) {
  const now = new Date();
  if (!date) date = now;
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const daysAgo = Math.floor((now - date) / millisecondsInDay);
  if (daysAgo === 0) {
    return `today`;
  } else if (daysAgo === 1) {
    return `${daysAgo} day ago`;
  } else {
    return `${daysAgo} days ago`;
  }
}
