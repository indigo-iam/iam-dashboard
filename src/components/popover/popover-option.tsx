// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button, ButtonProps } from "../buttons";
import { usePopover } from "./context";

export type PopoverOptionProps = ButtonProps;

export function PopoverOption(props: Readonly<PopoverOptionProps>) {
  const { popoverId } = usePopover();
  return (
    <Button
      {...props}
      variant="plain"
      popoverTarget={popoverId}
      popoverTargetAction="hide"
      className="hover:not:dark:text-gray-500 data-danger:text-danger dark:data-danger:text-danger-light group mx-auto flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-start text-base whitespace-nowrap text-gray-700 transition hover:bg-gray-200 dark:text-white dark:hover:bg-white/10"
    />
  );
}
