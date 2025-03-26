// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { useRef, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Input } from "@/components/inputs";
import { Button } from "@/components/buttons";

interface InputListProps {
  id?: string;
  originalItems: string[];
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (items: string[]) => void;
}

export function InputList(props: Readonly<InputListProps>) {
  const { id, originalItems, name, placeholder, type, required, onChange } =
    props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [items, setItems] = useState(originalItems ?? []);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addItem = (item: string) => {
    const { value, error } = sanitizeValue(item);
    if (error) {
      setErrorMessage(error);
      return;
    }
    if (!items.find(i => i === value)) {
      const newItems = [...items, value];
      onChange?.(newItems);
      setItems(newItems);
      if (errorMessage) {
        setErrorMessage(null);
      }
    } else {
      console.warn("item already present");
    }
  };
  const removeItem = (index: number) => {
    const newItems = items.toSpliced(index, 1);
    onChange?.(newItems);
    setItems(newItems);
  };

  const listItems = items.map((item, index) => (
    <li key={item} className="mt-1 flex flex-row items-center gap-2">
      <button
        type="button"
        onClick={() => removeItem(index)}
        className="w-5 rounded bg-secondary-100 hover:bg-danger hover:text-secondary dark:bg-secondary/60 dark:text-danger/80"
      >
        <XMarkIcon />
      </button>
      <input
        className="w-full bg-transparent"
        defaultValue={item}
        name={name}
        contentEditable={false}
        required={required}
      />
    </li>
  ));

  const sanitizeValue = (value: string) => {
    if (type == "url") {
      try {
        new URL(value);
      } catch (err) {
        return { value: "", error: `"${value}" is not a valid URL.` };
      }
    }
    return { value };
  };

  const handleClick = () => {
    addItem(value);
    setValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-2">
        <Input
          id={id}
          className="grow"
          onChange={event => setValue(event.target.value)}
          value={value}
          placeholder={placeholder}
          type={type}
        />
        <Button
          type="button"
          icon={<PlusIcon />}
          onClick={handleClick}
          disabled={value.length === 0}
        >
          Add
        </Button>
      </div>
      {errorMessage ? (
        <small className="text-danger">{errorMessage}</small>
      ) : null}
      <ul className="mt-2">{listItems}</ul>
    </div>
  );
}
