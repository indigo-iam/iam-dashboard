// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ReactElement, useId, useRef } from "react";

import { PopoverButtonProps } from "./popover-button";
import { PopoverPanelProps } from "./popover-panel";
import { PopoverContext } from "./context";

type PopoverProps = {
  children: [ReactElement<PopoverButtonProps>, ReactElement<PopoverPanelProps>];
};

export function Popover(props: Readonly<PopoverProps>) {
  const { children } = props;
  const popoverId = useId();
  const popoverRef = useRef<HTMLDivElement>(null);
  return (
    <PopoverContext value={{ popoverId, popoverRef }}>
      {children}
    </PopoverContext>
  );
}
