// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export function dateToHuman(date: Date): string {
  const now = Date.now();
  const delta = now - date.getTime();

  if (delta < 86400000) {
    return "today";
  }

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
