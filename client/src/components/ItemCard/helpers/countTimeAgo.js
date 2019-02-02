export default function countTimeAgo(date) {
  const now = new Date();
  if (!date) date = now;
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const daysAgo = Math.floor((now - date) / millisecondsInDay);
  const millisecondsInHour = millisecondsInDay / 24;
  const hoursAgo = Math.floor((now - date) / millisecondsInHour);

  let timeUnit, timeCount;
  if (daysAgo >= 1) {
    timeCount = daysAgo;
    timeUnit = daysAgo === 1 ? 'day' : 'days';
  } else if (hoursAgo >= 1) {
    timeCount = hoursAgo;
    timeUnit = hoursAgo === 1 ? 'hour' : 'hours';
  }
  return timeCount ? `${timeCount} ${timeUnit} ago` : 'just now';
}
