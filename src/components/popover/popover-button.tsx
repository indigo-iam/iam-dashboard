// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button, ButtonProps } from "../buttons";
import { usePopover } from "./context";

export type PopoverButtonProps = ButtonProps;

export function PopoverButton(props: Readonly<PopoverButtonProps>) {
  const { popoverId } = usePopover();
  return (
    <Button {...props} popoverTarget={popoverId} popoverTargetAction="toggle" />
  );
}
