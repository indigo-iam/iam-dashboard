"use client";
import Listbox from "@/components/Listbox";
import { useState } from "react";

type InputListOption = {
  id: string;
  name: string;
};

type SelectProps = {
  name: string;
  options: InputListOption[];
};

export default function Select(props: Readonly<SelectProps>) {
  const { name, options } = props;
  const [item, setItem] = useState(options[0]);
  return (
    <Listbox
      name={name}
      options={options}
      selected={item}
      onChange={setItem}
      title={item.name}
    />
  );
}
