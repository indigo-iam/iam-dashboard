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
      <div className="text-normal rounded-md p-1 hover:bg-secondary-200">
        {children}
      </div>
    </HeadlessMenuItem>
  );
}
