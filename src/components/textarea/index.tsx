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
  return (
    <textarea
      {...props}
      id={id}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    />
  );
}
