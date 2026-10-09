// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/16/solid";

import { Popover, PopoverButton, PopoverPanel } from "@/components/popover";
import { DropdownContext } from "./context";

type ChipProps = {
  value: string;
  onClick: () => void;
};

function Chip(props: Readonly<ChipProps>) {
  const { value, onClick } = props;
  return (
    <li
      key={value}
      className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
    >
      <span>{value}</span>
      <button
        type="button"
        aria-label={`Remove ${value}`}
        onClick={onClick}
        className="hover:text-danger cursor-pointer text-gray-400 transition"
      >
        <XMarkIcon className="size-4" />
      </button>
    </li>
  );
}

export type DropdownProps = {
  name?: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
};

export function Dropdown(props: Readonly<DropdownProps>) {
  const {
    name,
    value,
    defaultValue,
    onChange,
    placeholder = "Select...",
    disabled,
    className,
    children,
    ...others
  } = props;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string[]>(defaultValue ?? []);
  const selected = isControlled ? value! : internal;

  function commit(next: string[]) {
    if (!isControlled) {
      setInternal(next);
    }
    onChange?.(next);
  }

  function toggle(v: string) {
    commit(
      selected.includes(v)
        ? selected.filter(item => item !== v)
        : [...selected, v]
    );
  }

  function remove(v: string) {
    commit(selected.filter(item => item !== v));
  }

  const count = selected.length;

  return (
    <DropdownContext value={{ selected, toggle, remove }}>
      <div className={className}>
        <Popover>
          <PopoverButton
            variant="outline"
            type="button"
            disabled={disabled}
            aria-haspopup="listbox"
            {...others}
          >
            {placeholder}
            <ChevronDownIcon className="my-auto size-4" />
          </PopoverButton>
          <PopoverPanel positionArea="bottom_span-right" className="min-w-fit">
            <div role="listbox" aria-multiselectable>
              {children}
            </div>
          </PopoverPanel>
        </Popover>
        {count > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1">
            {selected.map(v => (
              <Chip key={v} value={v} onClick={() => remove(v)} />
            ))}
          </ul>
        )}
        {name &&
          selected.map(v => (
            <input key={v} type="hidden" name={name} value={v} />
          ))}
      </div>
    </DropdownContext>
  );
}
