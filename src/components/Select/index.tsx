"use client";
import Listbox, { ListboxOption } from "@/components/Listbox";
import { useState } from "react";

type SelectProps = {
  name: string;
  options: ListboxOption[];
  onChange?: (value: ListboxOption) => void;
  defaultOption?: ListboxOption;
};

export default function Select(props: Readonly<SelectProps>) {
  const { name, options, onChange, defaultOption } = props;
  const [item, setItem] = useState(defaultOption ?? options[0]);

  const handleChange = (value: ListboxOption) => {
    setItem(value);
    onChange?.(value);
  };

  return (
    <Listbox
      name={name}
      options={options}
      selected={item}
      onChange={handleChange}
      title={item.name}
    />
  );
}
