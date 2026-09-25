// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { cache } from "react";

// https://next-intl.dev/blog/date-formatting-nextjs
export const getNow = cache(() => Date.now());
export const getDate = cache(() => new Date());

const ONE_DAY_IN_MS = 1000 * 3600 * 24;

function isSameDate(a: Date, b: Date) {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

function isDaybefore(d: Date, other: Date) {
  return (
    d.getUTCFullYear() === other.getUTCFullYear() &&
    d.getUTCMonth() === other.getUTCMonth() &&
    d.getUTCDate() === other.getUTCDate() - 1
  );
}

export function dateToHuman(date: Date) {
  const today = getDate();

  if (isSameDate(date, today)) {
    return "today";
  }

  if (isDaybefore(date, today)) {
    return "yesterday";
  }

  const timeDifference = date.getTime() - today.getTime();
  const daysDifference = Math.ceil(timeDifference / ONE_DAY_IN_MS);

  if (Math.abs(daysDifference) <= 14) {
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
