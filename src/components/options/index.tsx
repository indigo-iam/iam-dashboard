// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

type OptionProps = {
  onClick?: () => void;
  danger?: boolean;
  children?: React.ReactNode;
};

export function Option(props: Readonly<OptionProps>) {
  const { onClick, danger, children } = props;
  const className = danger
    ? "text-danger hover:bg-danger hover:text-secondary p-2 text-start whitespace-nowrap focus:outline-none"
    : "hover:bg-gray-200 p-2 text-start whitespace-nowrap focus:outline-none";
  return (
    <MenuItem>
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </MenuItem>
  );
}

type OptionsProps = {
  children?: React.ReactNode;
};

export function Options(props: Readonly<OptionsProps>) {
  const { children } = props;
  return (
    <Menu>
      <MenuButton
        data-test="option"
        className="my-auto rounded-lg hover:bg-neutral-100 focus:outline-none data-open:bg-gray-200"
      >
        <EllipsisHorizontalIcon className="text-primary/75 dark:text-secondary/75 size-8" />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="flex flex-col rounded-lg bg-gray-50 shadow focus:outline-none dark:bg-white/10 dark:backdrop-blur-lg"
      >
        {children}
      </MenuItems>
    </Menu>
  );
}
