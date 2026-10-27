// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { createContext, useContext } from "react";

type LabelContextProps = {
  labelledBy: string;
};

export const LabelContext = createContext<LabelContextProps | null>(null);

export function useLabelledBy() {
  const context = useContext(LabelContext);
  if (context) {
    return context.labelledBy;
  }
}
