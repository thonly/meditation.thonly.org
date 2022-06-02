export function getDuration(startTime) {
  return getFormatedTime((new Date() - startTime) / 1000);
}

export function getAlarmTime(startTime, minutes) {
  const endTime = new Date(startTime.getTime() + minutes*60000);
  return getFormatedTime((endTime - new Date()) / 1000);
}

function getFormatedTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor(totalSeconds % 3600 / 60);
  const s = Math.floor(totalSeconds % 3600 % 60);

  const hours = String(h).padStart(2, '0');
  const minutes = String(m).padStart(2, '0');
  const seconds = String(s).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}