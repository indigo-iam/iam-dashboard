// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ListboxOption as HeadlessListboxOption } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";

export interface ListboxOptionProps {
  children: React.ReactNode;
  value: { id: string; name: string };
}

export default function ListboxOption(props: ListboxOptionProps) {
  const { children, value } = props;
  return (
    <HeadlessListboxOption
      className="group hover:text-secondary flex cursor-pointer gap-1 rounded-md px-2 py-1 select-none hover:bg-slate-600 dark:data-[focus]:bg-white/25"
      value={value}
    >
      <CheckIcon className="invisible my-auto size-4 group-data-[selected]:visible" />
      {children}
    </HeadlessListboxOption>
  );
}
