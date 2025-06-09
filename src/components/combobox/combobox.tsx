// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Combobox as HeadlessCombobox } from "@headlessui/react";
import { ComboboxInput } from "./combobox-input";
import { ComboboxOptions } from "./combobox-options";

type ComboboxProps<T> = {
  onQueryChange: (query: string) => void;
  onSelect: (value: T) => void;
  children: React.ReactNode;
};

export  function Combobox<T>(props: Readonly<ComboboxProps<T>>) {
  const { onSelect: onSelected, onQueryChange, children } = props;
  return (
    <HeadlessCombobox onChange={onSelected}>
      <div className="relative z-50">
        <ComboboxInput onChange={event => onQueryChange(event.target.value)} />
        <ComboboxOptions>{children}</ComboboxOptions>
      </div>
    </HeadlessCombobox>
  );
}
