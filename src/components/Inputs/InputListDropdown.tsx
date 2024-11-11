"use client";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Listbox from "@/components/Listbox";
type InputListOption = {
  id: string;
  name: string;
};

type InputListDropdown = {
  name: string;
  title: string;
  options: InputListOption[];
  defaultOptions: InputListOption[];
};

export function InputListDropdown(props: Readonly<InputListDropdown>) {
  const { name, title, options, defaultOptions } = props;
  const [items, setItems] = useState(defaultOptions);
  const removeItem = (index: number) => setItems(items.toSpliced(index, 1));

  const listItems = items.map((item, index) => (
    <li key={item.id} className="mt-1 flex flex-row items-center gap-2 text-sm">
      <button
        type="button"
        onClick={() => removeItem(index)}
        className="w-5 rounded bg-secondary-100 hover:bg-danger hover:text-secondary dark:bg-secondary/60 dark:text-danger/80"
      >
        <XMarkIcon />
      </button>
      <label htmlFor={item.name}>{item.name}</label>
    </li>
  ));

  return (
    <div className="flex flex-col">
      <div className="max-w-md">
        <Listbox
          name={name}
          options={options}
          selected={items}
          onChange={setItems}
          title={title}
          multiple
        />
      </div>
      <ul className="mt-2">{listItems}</ul>
    </div>
  );
}
