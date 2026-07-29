// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Listbox, ListboxButton, ListboxOptions } from "./listbox";
export { ListboxOption as SelectOption } from "./listbox";

export type SelectOption = {
  id: string;
  name: string;
};

type SelectProps = {
  name: string;
  children: React.ReactNode;
  onChange?: (value: { id: string; name: string }) => void;
  defaultValue?: { id: string; name: string };
  className?: string;
  disabled?: boolean;
};

export function Select(props: Readonly<SelectProps>) {
  const { name, onChange, children, defaultValue, disabled } = props;
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (value: { id: string; name: string }) => {
    onChange?.(value);
    setSelected(value);
  };

  return (
    <Listbox
      name={name}
      value={selected}
      onChange={handleChange}
      disabled={disabled}
    >
      <ListboxButton>{selected?.name}</ListboxButton>
      <ListboxOptions>{children}</ListboxOptions>
    </Listbox>
  );
}
