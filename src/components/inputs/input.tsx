// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  Input as HeadlessInput,
  type InputProps as HeadlessInputProps,
} from "@headlessui/react";

export interface InputProps extends HeadlessInputProps {
  "data-test"?: string;
}

export function Input(props: Readonly<InputProps>) {
  return (
    <HeadlessInput
      className="placeholder:disabled:text-secondary-600 w-full rounded border border-gray-300 bg-white px-2 py-1 disabled:bg-transparent disabled:text-slate-400 data-[invalid=true]:outline dark:border-white/30 dark:bg-transparent"
      {...props}
    />
  );
}
