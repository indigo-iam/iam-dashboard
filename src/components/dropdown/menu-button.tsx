// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

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
