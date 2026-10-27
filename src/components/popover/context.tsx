// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { createContext, RefObject, useContext } from "react";

export type PopoverContextProps = {
  popoverId: string;
  popoverRef: RefObject<HTMLDivElement | null>;
};

export const PopoverContext = createContext<PopoverContextProps | null>(null);

export function usePopover() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("PopoverContext is not defined");
  }
  return context;
}
