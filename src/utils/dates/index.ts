// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { cache } from "react";

// https://next-intl.dev/blog/date-formatting-nextjs
export const getNow = cache(() => Date.now());
export const getDate = cache(() => new Date());

export function dateToHuman(date: Date) {
  const now = new Date();
  if (date.toDateString() === now.toDateString()) {
    return "today";
  }
  const timeDifference = date.getTime() - now.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  if (Math.abs(daysDifference) <= 30) {
    const formatter = new Intl.RelativeTimeFormat("en", { style: "short" });
    return formatter.format(daysDifference, "days");
  }
  const formatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return `on ${formatter.format(date)}`;
}
