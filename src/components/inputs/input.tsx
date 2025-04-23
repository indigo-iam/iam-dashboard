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
      className="placeholder:disabled:text-secondary-600 outline-danger data-[invalid=true]:text-danger invalid:text-danger w-full rounded border border-gray-300 px-2 py-1 invalid:bg-red-50 invalid:outline disabled:bg-transparent disabled:text-slate-400 data-[invalid=true]:bg-red-50 data-[invalid=true]:outline"
      {...props}
    />
  );
}
