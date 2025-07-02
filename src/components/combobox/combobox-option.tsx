// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ComboboxOption as HeadlessComboboxOption } from "@headlessui/react";

type ComboboxOptionProps<T> = {
  value: T;
  children?: React.ReactNode;
};

export function ComboboxOption<T>(props: Readonly<ComboboxOptionProps<T>>) {
  const { value, children } = props;
  return (
    <HeadlessComboboxOption
      className="p-2 hover:rounded-lg hover:bg-gray-200 data-[disabled]:bg-transparent dark:hover:bg-white/20 dark:data-[disabled]:bg-transparent"
      value={value}
    >
      {children}
    </HeadlessComboboxOption>
  );
}
