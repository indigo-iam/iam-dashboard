// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  Input as HeadlessInput,
  type InputProps as HeadlessInputProps,
} from "@headlessui/react";

export interface InputProps extends HeadlessInputProps {
  "data-testid"?: string;
}

export function Input(props: Readonly<InputProps>) {
  return <HeadlessInput className="iam-input" {...props} />;
}
