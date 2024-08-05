export function dateToHuman(date: Date) {
  const now = Date.now();
  const delta = now - date.getTime();

  const formatter = new Intl.RelativeTimeFormat("en");

  const days = Math.ceil(delta / 86400000);
  if (days < 31) {
    return formatter.format(-days, "day");
  }

  const months = Math.floor(delta / 2678400000);
  if (months < 12) {
    return formatter.format(-months, "month");
  }

  const years = Math.floor(delta / 32140800000);
  return formatter.format(-years, "year");
}
