// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ListboxButton as HeadlessListboxButton } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type ListboxButtonProps = {
  children?: React.ReactNode;
};

export default function ListboxButton(props: Readonly<ListboxButtonProps>) {
  const { children } = props;
  return (
    <HeadlessListboxButton className="btn-secondary">
      <div className="flex flex-row justify-between gap-2">
        {children}
        <ChevronDownIcon className="right-0 my-auto size-4" />
      </div>
    </HeadlessListboxButton>
  );
}
