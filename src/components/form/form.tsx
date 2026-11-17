// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import React, { useMemo, useRef } from "react";
import { FormContext, FormContextValue } from "./provider";

export type FormProps = React.HTMLProps<HTMLFormElement>;

export function Form(props: FormProps) {
  const { onReset: userOnReset, ...formProps } = props;
  const callbacks = useRef<Set<() => void>>(new Set());

  const value = useMemo<FormContextValue>(
    () => ({
      subscribeReset(callback) {
        callbacks.current.add(callback);
        return () => {
          callbacks.current.delete(callback);
        };
      },
    }),
    []
  );

  function handleReset(event: React.FormEvent<HTMLFormElement>) {
    userOnReset?.(event);
    if (event.defaultPrevented) {
      return;
    }
    for (const callback of callbacks.current) {
      callback();
    }
  }

  return (
    <FormContext value={value}>
      <form {...formProps} onReset={handleReset} />
    </FormContext>
  );
}
