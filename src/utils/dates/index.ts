// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export function dateToHuman(date: Date): string {
  const now = Date.now();
  const delta = now - date.getTime();
  const sign = delta >= 0 ? -1 : 1;
  
  if (delta >= 0 && delta < 86400000) {
    return "today";
  }
  const absDelta = Math.abs(delta);
  const formatter = new Intl.RelativeTimeFormat("en");
  const days = Math.ceil(absDelta / 86400000);

  if (days <= 31) {
    return formatter.format(sign * days, "day");
  }

  const months = Math.floor(absDelta / 2678400000);
  if (months < 12) {
    return formatter.format(sign * months, "month");
  }

  const years = Math.floor(absDelta / 32140800000);
  return formatter.format(sign * years, "year");
}
