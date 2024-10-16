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
      className="truncate rounded-md bg-secondary p-2 shadow-md"
      {...menuItemsProps}
    >
      {children}
    </HeadlessMenuItems>
  );
}
