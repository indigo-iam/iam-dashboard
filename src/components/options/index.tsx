// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

type OptionProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  "data-danger"?: boolean;
  "data-testid"?: string;
};

export function Option(props: Readonly<OptionProps>) {
  const { children, ...other } = props;
  return (
    <MenuItem>
      <button
        className="hover:not:dark:text-gray-500 data-danger:text-danger dark:data-danger:text-danger-light btn-popover px-2 py-1.5 text-start text-sm whitespace-nowrap focus:outline-none"
        {...other}
      >
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
        data-testid="option"
        title="More"
        className="my-auto cursor-pointer rounded-md transition hover:bg-gray-200 focus:outline-none data-open:bg-gray-200 dark:hover:bg-gray-500 dark:data-active:bg-gray-200 dark:data-open:bg-gray-500"
      >
        <EllipsisHorizontalIcon className="size-8 text-gray-800 dark:text-white/75" />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        transition
        className="easy-out overlay flex flex-col p-2 data-closed:opacity-0"
      >
        {children}
      </MenuItems>
    </Menu>
  );
}
