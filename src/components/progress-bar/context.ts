// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { createContext, useContext } from "react";

type ProgressBarContextProps = {
  startLoadingTransition: (callback: () => Promise<void>) => void;
  startProgressBar: () => Promise<void>;
  stopProgressBar: () => void;
  isProgressBarHidden: boolean;
  progress: number;
};

export const ProgressBarContext = createContext<ProgressBarContextProps | null>(
  null
);

export function useProgressBar() {
  const context = useContext(ProgressBarContext);
  if (!context) {
    throw new Error(
      "ProgressBarContext is undefined, please verify you are calling 'useLoading' inside a child of ProgressBarContext component."
    );
  }
  return context;
}
