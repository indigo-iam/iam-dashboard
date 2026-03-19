// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Checkbox as HeadlessCheckbox, Label } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";

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
  return (
    <HeadlessCheckbox
      {...props}
      className="group flex aspect-square size-4 items-center rounded border bg-white dark:bg-gray-800"
    >
      <CheckIcon className="hidden size-4 fill-gray-700 group-data-checked:block dark:fill-gray-300" />
    </HeadlessCheckbox>
  );
}

type LabeledCheckboxProps = CheckboxProps & {
  children?: React.ReactNode;
};

export function LabeledCheckbox(props: Readonly<LabeledCheckboxProps>) {
  const { children, ...checkboxProps } = props;
  return (
    <div className="flex flex-row items-center gap-2">
      <HeadlessCheckbox
        {...checkboxProps}
        className="group flex aspect-square size-4 items-center rounded border bg-white dark:bg-gray-800"
      >
        <CheckIcon className="hidden size-4 fill-gray-700 group-data-checked:block dark:fill-gray-300" />
      </HeadlessCheckbox>
      <Label className="text-sm">{children}</Label>
    </div>
  );
}
