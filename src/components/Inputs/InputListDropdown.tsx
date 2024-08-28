"use client";
import { useRef, useState } from "react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@/components/Dropdown";

type InputListOption = {
  name: string;
  value: string;
};

type InputListDropdown = {
  name: string;
  title: string;
  options: InputListOption[];
  defaultOptions: InputListOption[];
};

export function InputListDropdown(props: Readonly<InputListDropdown>) {
  const { name, title, options, defaultOptions } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setItems] = useState(defaultOptions ?? []);

  const addItem = (item: InputListOption) => {
    if (!selected.find(i => i.name === item.name)) {
      setItems([...selected, item]);
    }
  };
  const removeItem = (index: number) => setItems(selected.toSpliced(index, 1));

  const listItems = selected.map((item, index) => (
    <li
      key={item.name}
      className="mt-1 flex flex-row items-center gap-2 text-sm"
    >
      <button
        type="button"
        onClick={() => removeItem(index)}
        className="w-5 rounded bg-secondary-100 hover:bg-danger hover:text-secondary"
      >
        <XMarkIcon />
      </button>
      <input
        id={item.name}
        type="hidden"
        className="w-full"
        defaultValue={item.value}
        name={name}
        contentEditable={false}
      />
      <label htmlFor={item.name}>{item.name}</label>
    </li>
  ));

  const handleClick = (option: InputListOption) => {
    addItem(option);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-2">
        <Menu>
          <MenuButton className="flex flex-row gap-2 rounded-lg border p-2 shadow-md hover:bg-gray-100">
            {title}
            <ChevronDownIcon className="m-auto h-4 w-4" />
          </MenuButton>
          <MenuItems>
            {options.map(o => (
              <MenuItem key={o.name}>
                <button
                  className="max-w-56 truncate px-2 text-left"
                  title={o.name}
                  onClick={() => handleClick(o)}
                >
                  {o.name}
                </button>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
      <ul className="mt-2">{listItems}</ul>
    </div>
  );
}
