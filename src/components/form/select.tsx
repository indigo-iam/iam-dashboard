// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@/components/listbox";

import { useState } from "react";

export { ListboxOption as SelectOption };

type SelectProps = {
  name: string;
  children: React.ReactNode;
  onChange?: (value: { id: string; name: string }) => void;
  defaultValue?: { id: string; name: string };
  disabled?: boolean;
  className?: string;
};

export function Select(props: Readonly<SelectProps>) {
  const { name, onChange, children, defaultValue, disabled, className } = props;
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
      <ListboxButton className={className}>{selected?.name}</ListboxButton>
      <ListboxOptions>{children}</ListboxOptions>
    </Listbox>
  );
}
