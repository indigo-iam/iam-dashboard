"use client";
import { useRef, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Input, type InputProps } from "@/components/Inputs/Input";
import { Button } from "@/components/Buttons";

interface InputListProps extends InputProps {
  originalItems: string[];
}

export function InputList(props: Readonly<InputListProps>) {
  const { originalItems, name, placeholder } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [items, setItems] = useState(originalItems ?? []);

  const addItem = (item: string) => {
    if (!items.find(i => i === item)) {
      setItems([...items, item]);
    } else {
      console.warn("address already present");
    }
  };
  const removeItem = (index: number) => {
    setItems(items.toSpliced(index, 1));
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
