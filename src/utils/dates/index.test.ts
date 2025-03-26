// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { dateToHuman } from ".";

test("To Human", () => {
  let d = new Date();
  expect(dateToHuman(d)).toBe("Today");

  d = new Date("2020-01-01");
  expect(dateToHuman(d)).toBe("Long time ago...");
});
