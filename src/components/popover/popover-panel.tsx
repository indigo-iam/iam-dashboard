// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { parsePositionArea, PositionArea } from "@/utils/styles";
import { usePopover } from "./context";

export type PopoverPanelProps = {
  className?: string;
  positionArea?: PositionArea;
  "aria-label"?: string;
  children: React.ReactNode;
};

export function PopoverPanel(props: Readonly<PopoverPanelProps>) {
  const { children, className, positionArea = "bottom", ...others } = props;
  const { popoverId, popoverRef } = usePopover();
  const _positionArea = parsePositionArea(positionArea);
  return (
    <div
      id={popoverId}
      ref={popoverRef}
      popover="auto"
      className={`inset-auto max-h-dvh overflow-y-auto rounded-xl border bg-white p-2 text-gray-800 opacity-0 shadow-xl transition-opacity transition-discrete duration-200 focus:outline-none dark:bg-gray-700 dark:text-gray-100 [&:popover-open]:opacity-100 [&:popover-open]:starting:opacity-0 ${_positionArea} ${className ?? ""}`}
      {...others}
    >
      {children}
    </div>
  );
}
