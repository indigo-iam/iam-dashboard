// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { CheckIcon } from "@heroicons/react/16/solid";

import { useDropdown } from "./context";
import { PopoverOption } from "../popover";

export type DropdownOptionProps = {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
};

export function DropdownOption(props: Readonly<DropdownOptionProps>) {
  const { value, disabled, children } = props;
  const { selected, toggle } = useDropdown();
  const isSelected = selected.includes(value);
  return (
    <PopoverOption
      aria-selected={isSelected}
      disabled={disabled}
      role="option"
      type="button"
      onClick={() => toggle(value)}
    >
      <CheckIcon className="size-4 min-w-4 opacity-0 group-aria-selected:opacity-100" />
      {children}
    </PopoverOption>
  );
}
