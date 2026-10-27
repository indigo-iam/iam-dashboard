// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useDescribedBy } from "../description/context";
import { useLabelledBy } from "../label/context";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  "data-testid"?: string;
};

export function Input(props: Readonly<InputProps>) {
  const { className, ...others } = props;
  const { labelledBy } = useLabelledBy();
  const { describedBy } = useDescribedBy();
  return (
    <input
      className={`${className ?? ""} invalid:outline-danger invalid:text-danger w-full rounded border-none bg-neutral-100 px-2 py-1 text-gray-600 placeholder:text-gray-400 invalid:outline disabled:text-gray-500 dark:bg-white/10 dark:text-white dark:disabled:text-gray-400`}
      {...others}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    />
  );
}
