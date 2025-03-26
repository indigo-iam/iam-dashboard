// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  MenuItems as HeadlessMenuItems,
  MenuItemsProps as HeadlessMenuItemsProps,
} from "@headlessui/react";

interface MenuItemsProps extends HeadlessMenuItemsProps {}
export function MenuItems(props: Readonly<MenuItemsProps>) {
  const { children, ...menuItemsProps } = props;
  return (
    <HeadlessMenuItems
      anchor="bottom"
      className="z-20 truncate rounded-md bg-secondary p-2 shadow-md dark:bg-white/10 dark:backdrop-blur-lg"
      {...menuItemsProps}
    >
      {children}
    </HeadlessMenuItems>
  );
}
