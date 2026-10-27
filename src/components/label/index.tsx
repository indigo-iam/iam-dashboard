// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useLabelledBy } from "./context";

type LabelProps = {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
};

export function Label(props: Readonly<LabelProps>) {
  const { children, className, htmlFor } = props;
  const labelledBy = useLabelledBy();
  return (
    <label
      className={`group-has-required:after:text-danger block pb-1.5 text-sm text-gray-600 group-has-required:after:content-['*'] dark:text-gray-300 ${className ?? ""}`}
      id={labelledBy}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}
