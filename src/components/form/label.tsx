// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  Label as HeadlessLabel,
  LabelProps as HeadlessLabelProps,
} from "@headlessui/react";

interface LabelProps extends HeadlessLabelProps {
  required?: boolean;
}

export default function Label(props: Readonly<LabelProps>) {
  const { required, ...labelProps } = props;
  let className = "text-normal font-bold";
  if (required) {
    className += " after:content-['*'] after:text-danger";
  }

  return <HeadlessLabel className={className} {...labelProps} />;
}
