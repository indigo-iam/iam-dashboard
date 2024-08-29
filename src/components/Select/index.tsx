"use client";
import Listbox, { InputListOption } from "@/components/Listbox";
import { useState } from "react";

type SelectProps = {
  name: string;
  options: InputListOption[];
  onChange?: (value: InputListOption) => void;
};

export default function Select(props: Readonly<SelectProps>) {
  const { name, options, onChange } = props;
  const [item, setItem] = useState(options[0]);

  const handleChange = (value: InputListOption) => {
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
