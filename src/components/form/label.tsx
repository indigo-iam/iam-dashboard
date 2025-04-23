// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  Label as HeadlessLabel,
  LabelProps as HeadlessLabelProps,
} from "@headlessui/react";

interface LabelProps extends HeadlessLabelProps {}

export default function Label(props: Readonly<LabelProps>) {
  return (
    <HeadlessLabel
      className="data-[required]:after:text-danger text-light text-sm data-[required]:after:content-['*']"
      {...props}
    />
  );
}
