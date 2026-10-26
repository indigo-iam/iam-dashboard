// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { createContext, useContext } from "react";

type DescriptionContextProps = {
  describedBy: string;
};

export const DescriptionContext = createContext<DescriptionContextProps | null>(
  null
);

export function useDescribedBy() {
  const context = useContext(DescriptionContext);
  if (!context) {
    throw new Error("Use <Description> component inside <Field>");
  }
  return context;
}
