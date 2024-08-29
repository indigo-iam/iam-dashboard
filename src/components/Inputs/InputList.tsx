"use client";
import { useRef, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Input } from "@/components/Inputs";
import { Button } from "@/components/Buttons";

interface InputListProps {
  originalItems: string[];
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (items: string[]) => void;
}

export function InputList(props: Readonly<InputListProps>) {
  const { originalItems, name, placeholder, type, required, onChange } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [items, setItems] = useState(originalItems ?? []);

  const addItem = (item: string) => {
    if (!items.find(i => i === item)) {
      const newItems = [...items, item];
      onChange?.(newItems);
      setItems(newItems);
    } else {
      console.warn("address already present");
    }
  };
  const removeItem = (index: number) => {
    const newItems = items.toSpliced(index, 1);
    onChange?.(newItems);
    setItems(newItems);
  };

  const listItems = items.map((item, index) => (
    <li key={item} className="mt-1 flex flex-row items-center gap-2 text-sm">
      <button
        type="button"
        onClick={() => removeItem(index)}
        className="w-5 rounded bg-secondary-100 hover:bg-danger hover:text-secondary"
      >
        <XMarkIcon />
      </button>
      <input
        className="w-full"
        defaultValue={item}
        name={name}
        contentEditable={false}
      />
    </li>
  ));

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
          className="grow"
          onChange={event => setValue(event.target.value)}
          value={value}
          placeholder={placeholder}
          required={required}
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
      <ul className="mt-2">{listItems}</ul>
    </div>
  );
}
