// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { createContext, useContext } from "react";
import { ToastTypes } from "./toast";

type ToasterContextProps = {
  toast: (options: {
    title: string;
    description?: string;
    type: ToastTypes;
  }) => void;
  success: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  close: (id: number) => void;
};

export const ToasterContext = createContext<ToasterContextProps | null>(null);

export function useToaster() {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be called from within ToasterProvider");
  }
  return context;
}
