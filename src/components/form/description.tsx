// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  Description as HeadlessDescription,
  DescriptionProps,
} from "@headlessui/react";

export default function Description(props: Readonly<DescriptionProps>) {
  return (
    <HeadlessDescription
      {...props}
      className="text-xs text-primary/60 dark:text-secondary/60"
    />
  );
}
