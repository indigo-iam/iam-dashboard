// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  Label as HeadlessLabel,
  LabelProps as HeadlessLabelProps,
} from "@headlessui/react";

interface LabelProps extends HeadlessLabelProps {}

export function Label(props: Readonly<LabelProps>) {
  return (
    <HeadlessLabel
      className="data-required:after:text-danger block pb-1.5 text-sm text-gray-600 data-required:after:content-['*'] dark:text-gray-300"
      {...props}
    />
  );
}
