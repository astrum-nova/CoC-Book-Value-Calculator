export function secondsToDuration(totalSeconds: number): string {
  if (totalSeconds < 0 || !Number.isInteger(totalSeconds)) totalSeconds = Math.max(0, Math.floor(totalSeconds));
  const SECONDS_IN_DAY = 86400; // 60 * 60 * 24
  const SECONDS_IN_HOUR = 3600;  // 60 * 60
  const SECONDS_IN_MINUTE = 60;
  const days = Math.floor(totalSeconds / SECONDS_IN_DAY);
  let remainingSeconds = totalSeconds % SECONDS_IN_DAY;
  const hours = Math.floor(remainingSeconds / SECONDS_IN_HOUR);
  remainingSeconds %= SECONDS_IN_HOUR;
  const minutes = Math.floor(remainingSeconds / SECONDS_IN_MINUTE);
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || parts.length > 0) parts.push(`${hours}h`);
  if (minutes > 0 || parts.length > 0) parts.push(`${minutes}m`);
  if (parts.length === 0) return '0m';
  return parts.join(' ');
}
export function getObjectByID(id: number, objects: any[]): any {
  let res;
  objects.forEach(obj => {
    if (obj.data == id) res = obj;
  })
  return res;
}
