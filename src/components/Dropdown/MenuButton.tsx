import {
  MenuButton as HeadlessMenuButton,
  MenuButtonProps as HeadlessMenuButtonProps,
} from "@headlessui/react";

interface MenuButtonProps extends HeadlessMenuButtonProps {}
export function MenuButton(props: Readonly<MenuButtonProps>) {
  const { children, ...menuButtonProps } = props;
  return (
    <HeadlessMenuButton {...menuButtonProps}>{children}</HeadlessMenuButton>
  );
}
