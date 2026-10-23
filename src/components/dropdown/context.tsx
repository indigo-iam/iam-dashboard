// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { createContext, useContext } from "react";

export type DropdownContextProps = {
  selected: string[];
  toggle: (value: string) => void;
  remove: (value: string) => void;
};

export const DropdownContext = createContext<DropdownContextProps | null>(null);

export function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("DropdownContext is not defined");
  }
  return context;
}
