// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useRef, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";

import { Input } from "@/components/inputs";
import { Button } from "@/components/buttons";

type InputListProps = {
  value?: string[];
  defaultValue?: string[];
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (items: string[]) => void;
};

export function InputList(props: Readonly<InputListProps>) {
  const {
    value, //
    defaultValue,
    name,
    placeholder,
    required,
    type,
    onChange,
  } = props;
  const [inputValue, setInputValue] = useState("");
  const [innerValue, setInnerValue] = useState(defaultValue ?? []);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isControlled = value !== undefined;
  const items = isControlled ? value : innerValue;

  function addItem(item: string) {
    const { value, error } = sanitizeValue(item);
    if (error) {
      setErrorMessage(error);
      return;
    }
    if (!items.includes(value)) {
      const newItems = [...items, value];
      onChange?.(newItems);
      if (!isControlled) {
        setInnerValue(newItems);
      }
      if (errorMessage) {
        setErrorMessage(null);
      }
    } else {
      console.warn("item already present");
    }
  }

  function removeItem(index: number) {
    const newItems = items.toSpliced(index, 1);
    if (!isControlled) {
      setInnerValue(newItems);
    }
    onChange?.(newItems);
  }

  const listItems = items.map((item, index) => (
    <li key={item} className="mt-1 flex flex-row items-center gap-2">
      <button
        type="button"
        onClick={() => removeItem(index)}
        className="bg-secondary-100 hover:bg-danger dark:bg-secondary/60 dark:text-danger/80 w-5 rounded hover:text-white"
      >
        <XMarkIcon />
      </button>
      <input
        className="flex grow text-sm"
        defaultValue={item}
        name={name}
        contentEditable={false}
        required={required}
      />
    </li>
  ));

  function sanitizeValue(value: string) {
    if (type == "url") {
      try {
        new URL(value);
      } catch (err) {
        console.warn(err);
        return { value: "", error: `"${value}" is not a valid URL.` };
      }
    }
    return { value };
  }

  function handleClick() {
    addItem(inputValue);
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <>
      <div className="flex gap-4">
        <Input
          ref={inputRef}
          onChange={event => setInputValue(event.target.value)}
          placeholder={placeholder}
          type={type}
          required={required && items.length === 0}
        />
        <Button
          variant="outline"
          type="button"
          onClick={handleClick}
          disabled={inputValue.length === 0}
        >
          <PlusIcon className="size-5" />
          Add
        </Button>
      </div>
      {errorMessage ? (
        <small className="text-danger">{errorMessage}</small>
      ) : null}
      <ul className="mt-2">{listItems}</ul>
    </>
  );
}
