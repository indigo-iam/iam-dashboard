declare global {
  interface Date {
    toHuman(): string;
  }
}

export function toHuman(this: Date) {
  const now = new Date();
  if (now.getTime() - this.getTime() < 86400000) {
    return "Today";
  }
  return "Long time ago...";
}

Date.prototype.toHuman = toHuman;
