// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { CheckIcon } from "@heroicons/react/16/solid";

import { Label } from "@/components/label";
import { useField } from "../field/context";
import { Input } from "../inputs";
import { InputProps } from "../inputs/input";

export interface CheckboxState<T> {
  checked: boolean;
  underlying: T;
  index: number;
}

type CheckboxProps = InputProps;

export function Checkbox(props: Readonly<CheckboxProps>) {
  const { ...other } = props;

  return (
    <div className="group relative flex aspect-square size-4 cursor-pointer items-center rounded border bg-white data-disabled:cursor-not-allowed data-disabled:bg-gray-100 dark:bg-gray-800">
      <CheckIcon className="hidden size-4 fill-gray-700 group-has-checked:block dark:fill-gray-300" />
      <Input
        variant="plain"
        className="absolute h-5 w-5 appearance-none"
        {...other}
        type="checkbox"
      />
    </div>
  );
}

type LabeledCheckboxProps = CheckboxProps & {
  children?: React.ReactNode;
};

export function LabeledCheckbox(props: Readonly<LabeledCheckboxProps>) {
  const { children, ...checkboxProps } = props;
  const { inputId } = useField();
  const id = props.id ?? inputId;
  return (
    <Label
      className="flex cursor-pointer items-center gap-2 pb-0.5! text-sm"
      htmlFor={id}
    >
      <Checkbox {...checkboxProps} id={id} />
      {children}
    </Label>
  );
}
