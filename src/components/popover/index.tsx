// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button, ButtonProps } from "../buttons";

type PopoverButtonProps = ButtonProps;

export function PopoverButton(props: Readonly<PopoverButtonProps>) {
  return (
    <Button
      {...props}
      variant="plain"
      className="dark:hover:bg-white/10; hover:not:dark:text-gray-500 data-danger:text-danger dark:data-danger:text-danger-light mx-auto flex w-full cursor-pointer items-center gap-2 rounded-md p-2 px-2 py-1.5 text-start text-base whitespace-nowrap text-gray-700 transition hover:bg-gray-200 dark:text-white dark:hover:bg-gray-200/30"
    />
  );
}
