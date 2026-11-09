// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useId } from "react";

import { useDescribedBy } from "../description/context";
import { useField } from "../field/context";
import { useLabelledBy } from "../label/context";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea(props: Readonly<TextareaProps>) {
  const labelledBy = useLabelledBy();
  const describedBy = useDescribedBy();
  const { inputId } = useField();
  const fallbackId = useId();
  const id = props.id ?? inputId ?? fallbackId;
  const outerClassName = props.className ? ` ${props.className}` : "";
  return (
    <textarea
      {...props}
      className={
        "invalid:text-danger invalid:border-danger w-full rounded bg-neutral-100 px-2 py-1 text-gray-600 placeholder:text-gray-400 valid:border-none invalid:border disabled:text-gray-500 dark:bg-white/10 dark:text-white dark:disabled:text-gray-400" +
        outerClassName
      }
      id={id}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    />
  );
}
