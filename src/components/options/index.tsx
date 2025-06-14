// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

type OptionProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  "data-danger"?: boolean;
  "data-test"?: string;
};

export function Option(props: Readonly<OptionProps>) {
  const { children, ...other } = props;
  return (
    <MenuItem>
      <button
        className="data-[danger]:hover:bg-danger hover:text-secondary data-[danger]:text-danger data-[danger]:hover:text-secondary p-2 text-start whitespace-nowrap hover:bg-gray-200 focus:outline-none dark:hover:bg-white/30"
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
        data-test="option"
        className="my-auto rounded-lg hover:bg-neutral-100 focus:outline-none data-open:bg-gray-200 dark:hover:bg-white/20 dark:data-open:bg-white/30"
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
