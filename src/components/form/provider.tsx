// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { createContext, useContext, useEffect, useRef } from "react";

export type FormContextValue = {
  /**
   * Subscribe a callback that is invoked every time the form is reset.
   * Returns an unsubscribe function.
   */
  subscribeReset: (callback: () => void) => () => void;
};

export const FormContext = createContext<FormContextValue | null>(null);

export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("Call 'useForm' from a component child of Form");
  }
  return context;
}

// Register `callback` to be invoked every time the enclosing `<Form>` is reset
export function useFormReset(callback: () => void) {
  const { subscribeReset } = useForm();
  const callbackRef = useRef(callback);

  // Keep the latest callback available without re-subscribing on every render.
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(
    () => subscribeReset(() => callbackRef.current()),
    [subscribeReset]
  );
}
