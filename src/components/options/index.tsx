// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

type OptionsProps = {
  children?: React.ReactNode;
};

export default function Options(props: Readonly<OptionsProps>) {
  const { children } = props;
  return (
    <Popover className="relative my-auto size-8">
      <PopoverButton data-test="option">
        <EllipsisHorizontalIcon className="text-primary/75 dark:text-secondary/75 size-8" />
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        className="flex flex-col rounded-lg bg-gray-50 shadow dark:bg-white/10 dark:backdrop-blur-lg"
      >
        {children}
      </PopoverPanel>
    </Popover>
  );
}
