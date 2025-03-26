// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export function toTitleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function camelCaseToTitle(s: string) {
  return toTitleCase(s.split("_").join(" "));
}

export function capitalize(s: string) {
  return s.replace(/\b\w/g, w => w.toUpperCase());
}
