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
      <div className="hover:bg-hover truncate rounded-md p-1 hover:bg-secondary-200 dark:hover:bg-white/25 dark:hover:text-white">
        {children}
      </div>
    </HeadlessMenuItem>
  );
}
