// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

export { useToaster } from "./context";
export { ToasterProvider } from "./provider";
export { type ToastTypes, type ToastProps } from "./toast";

import { ToastTypes } from "./toast";

export type Notification = {
  type: ToastTypes;
  title: string;
  description?: string;
};
