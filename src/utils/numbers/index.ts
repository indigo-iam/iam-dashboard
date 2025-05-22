// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export function arrayRange(start: number, stop: number, step: number = 1) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step
  );
}
