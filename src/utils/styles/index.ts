// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export type PositionArea =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "bottom_span-left"
  | "bottom_span-right";

export function parsePositionArea(s: PositionArea) {
  switch (s) {
    case "top":
      return "[position-area:top]";
    case "right":
      return "[position-area:right]";
    case "bottom":
      return "[position-area:bottom]";
    case "bottom_span-left":
      return "[position-area:bottom_span-left]";
    case "bottom_span-right":
      return "[position-area:bottom_span-right]";
    case "left":
      return "[position-area:left]";
  }
}
