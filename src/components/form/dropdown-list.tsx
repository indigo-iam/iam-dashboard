// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "./listbox";

type DropdownListOption = {
  id: string;
  name: string;
};

type DropdownListProps = {
  name: string;
  title: string;
  options: DropdownListOption[];
  defaultOptions: DropdownListOption[];
};

export function DropdownList(props: Readonly<DropdownListProps>) {
  const { name, title, options, defaultOptions } = props;
  const [items, setItems] = useState(defaultOptions);
  const removeItem = (index: number) => setItems(items.toSpliced(index, 1));

  const listItems = items.map((item, index) => (
    <li key={item.id} className="mt-1 flex flex-row items-center gap-2">
      <button
        title="Remove scope"
        type="button"
        onClick={() => removeItem(index)}
        className="bg-secondary-100 hover:bg-danger hover:text-secondary dark:text-secondary/80 w-5 rounded dark:bg-transparent"
      >
        <XMarkIcon />
      </button>
      <label htmlFor={item.name}>{item.name}</label>
    </li>
  ));

  return (
    <div className="flex flex-col">
      <div className="max-w-md">
        <Listbox name={name} onChange={setItems} value={items} multiple>
          <ListboxButton>{title}</ListboxButton>
          <ListboxOptions>
            {options.map(opt => (
              <ListboxOption key={opt.id} value={opt}>
                {opt.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
      <ul className="mt-2">{listItems}</ul>
    </div>
  );
}
