// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { usePopover } from "./context";

export type PopoverPanelProps = {
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
};

export function PopoverPanel(props: Readonly<PopoverPanelProps>) {
  const { className, children, ...others } = props;
  const { popoverId, popoverRef } = usePopover();
  return (
    <div
      id={popoverId}
      ref={popoverRef}
      popover="auto"
      className={
        "inset-auto rounded-xl border bg-white p-2 text-gray-800 shadow-xl transition-all duration-200 focus:outline-none dark:bg-gray-700 dark:text-gray-100 " +
          className || ""
      }
      {...others}
    >
      {children}
    </div>
  );
}
