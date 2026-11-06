// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { RefObject, useId } from "react";

import { useDescribedBy } from "../description/context";
import { useField } from "../field/context";
import { useLabelledBy } from "../label/context";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "plain";
  ref?: RefObject<HTMLInputElement | null>;
  "data-testid"?: string;
};

export function Input(props: Readonly<InputProps>) {
  const { variant, ...others } = props;
  const labelledBy = useLabelledBy();
  const describedBy = useDescribedBy();
  const { inputId } = useField();
  const fallbackId = useId();
  const id = props.id ?? inputId ?? fallbackId;
  return (
    <input
      className={
        variant === "plain"
          ? props.className
          : `invalid:text-danger invalid:border-danger w-full rounded bg-neutral-100 px-2 py-1 text-gray-600 placeholder:text-gray-400 valid:border-none invalid:border disabled:text-gray-500 dark:bg-white/10 dark:text-white dark:disabled:text-gray-400 ${props.className ?? ""}`
      }
      {...others}
      id={id}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    />
  );
}
