// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ListboxButton as HeadlessListboxButton } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type ListboxButtonProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function ListboxButton(props: Readonly<ListboxButtonProps>) {
  const { children, className } = props;
  return (
    <HeadlessListboxButton className={className}>
      {children}
      <ChevronDownIcon className="right-0 my-auto size-4" />
    </HeadlessListboxButton>
  );
}
