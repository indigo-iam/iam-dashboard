export function dateToHuman(date: Date) {
  const now = new Date();
  if (now.getTime() - date.getTime() < 86400000) {
    return "Today";
  }
  return "Long time ago...";
}
