// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  Input as HeadlessInput,
  type InputProps as HeadlessInputProps,
} from "@headlessui/react";

export interface InputProps extends HeadlessInputProps {
  className?: string;
  "data-test"?: string;
}

export function Input(props: Readonly<InputProps>) {
  const { className, ...inputProps } = props;
  return (
    <div className={className}>
      <HeadlessInput
        className="disabled:bg-secondary-300 placeholder:disabled:text-secondary-600 disabled:dark:bg-dark/10 w-full rounded-lg border border-gray-400 px-4 py-1 dark:bg-white/5 disabled:dark:text-white/20"
        {...inputProps}
      />
    </div>
  );
}
