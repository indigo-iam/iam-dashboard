// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useRef } from "react";
import { CheckIcon } from "@heroicons/react/16/solid";

import { Label } from "@/components/label";

export interface CheckboxState<T> {
  checked: boolean;
  underlying: T;
  index: number;
}

type CheckboxProps = {
  id?: string;
  name?: string;
  value?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};

export function Checkbox(props: Readonly<CheckboxProps>) {
  const { onChange, ...other } = props;
  const checkboxRef = useRef<HTMLInputElement>(null);
  const isControlled = other.checked !== undefined;

  function handleChange() {
    if (!checkboxRef.current) {
      return;
    }
    if (isControlled) {
      onChange?.(!other.checked);
    } else {
      checkboxRef.current.checked = !checkboxRef.current.checked;
    }
  }

  function handleKeydown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.code === "Space") {
      handleChange();
    }
  }

  return (
    <span
      className="group flex aspect-square size-4 items-center rounded border bg-white dark:bg-gray-800"
      onClick={handleChange}
      onKeyDown={handleKeydown}
      role="checkbox"
      aria-checked={other.checked}
      tabIndex={0}
    >
      <CheckIcon className="hidden size-4 fill-gray-700 group-has-checked:block dark:fill-gray-300" />
      <input {...other} type="checkbox" hidden readOnly ref={checkboxRef} />
    </span>
  );
}

type LabeledCheckboxProps = CheckboxProps & {
  children?: React.ReactNode;
};

export function LabeledCheckbox(props: Readonly<LabeledCheckboxProps>) {
  const { children, ...checkboxProps } = props;
  return (
    <div className="flex flex-row items-center gap-2">
      <Checkbox {...checkboxProps} />
      <Label className="pb-0.5! text-sm">{children}</Label>
    </div>
  );
}
