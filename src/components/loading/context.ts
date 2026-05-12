// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { createContext, useContext } from "react";

type LoadingContextProps = {
  startLoadingTransition: (callback: () => Promise<void>) => void;
};

export const LoadingContext = createContext<LoadingContextProps | null>(null);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error(
      "LoadingContext is undefined, please verify you are calling 'useLoading' inside a child of LoadingContext component."
    );
  }
  return context;
}
