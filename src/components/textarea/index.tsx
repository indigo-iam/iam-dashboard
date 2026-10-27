// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useDescribedBy } from "../description/context";
import { useLabelledBy } from "../label/context";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea(props: Readonly<TextareaProps>) {
  const labelledBy = useLabelledBy();
  const describedBy = useDescribedBy();
  return (
    <textarea
      {...props}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    />
  );
}
