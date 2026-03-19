// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  Description as HeadlessDescription,
  DescriptionProps,
} from "@headlessui/react";

export function Description(props: Readonly<DescriptionProps>) {
  return (
    <HeadlessDescription
      {...props}
      className="pt-2 font-light text-xs text-gray-400 dark:text-gray-400"
    />
  );
}
