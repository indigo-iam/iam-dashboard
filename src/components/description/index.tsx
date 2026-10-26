// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useDescribedBy } from "./context";

type DescriptionProps = {
  children: React.ReactNode;
};

export function Description(props: Readonly<DescriptionProps>) {
  const { children } = props;
  const { describedBy } = useDescribedBy();
  return (
    <p
      id={describedBy}
      className="pt-2 text-xs text-gray-500 dark:text-gray-400"
    >
      {children}
    </p>
  );
}
