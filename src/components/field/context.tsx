// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { createContext, useContext } from "react";

type FieldContextProps = {
  inputId: string;
};

export const FieldContext = createContext<FieldContextProps | null>(null);

export function useField() {
  const context = useContext(FieldContext);
  return {
    inputId: context?.inputId,
  };
}
