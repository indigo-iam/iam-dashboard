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
      className="data-[required]:after:text-danger text-light dark:text-secondary py-1 text-sm data-[required]:after:content-['*']"
      {...props}
    />
  );
}
