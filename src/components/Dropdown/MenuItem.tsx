import {
  MenuItem as HeadlessMenuItem,
  MenuItemProps as HeadlessMenuItemProps,
} from "@headlessui/react";

interface MenuItemProps extends HeadlessMenuItemProps {
  children: React.ReactNode;
}
export function MenuItem(props: Readonly<MenuItemProps>) {
  const { children, ...menuItemProps } = props;
  return (
    <HeadlessMenuItem {...menuItemProps}>
      <div className="truncate rounded-md p-1 text-sm hover:bg-secondary-200">
        {children}
      </div>
    </HeadlessMenuItem>
  );
}
