"use client";
import { Capsule } from "./Capsule";
import { Dropdown } from "./Dropdown";
import { MultiChoiceItemI } from "./MultiChoiceItem";
import { useEffect, useState } from "react";

interface MultiChoiceDropdownProps {
  items: MultiChoiceItemI[];
  selected: MultiChoiceItemI[];
  onDeselect?: (item: MultiChoiceItemI) => void;
  placeholder?: string;
}

export function MultiChoiceDropdown(props: Readonly<MultiChoiceDropdownProps>) {
  const { items, selected, onDeselect, placeholder } = props;
  const [show, setShow] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleOnFocus = () => {
    if (!show) {
      setShow(true);
    }
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.parentNode?.contains(e.relatedTarget)) {
      return;
    }
    setShow(false);
  };

  useEffect(() => {
    return () => {
      setShow(false);
    };
  }, []);

  const handleUserInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setUserInput(value);
  };

  const filteredItems = items.filter(item => item.title.includes(userInput));

  return (
    <div className="h-100 relative rounded-3xl border bg-secondary-200 px-4 py-2">
      <input
        type="search"
        className="w-full bg-transparent"
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleUserInputChanged}
      />
      <div className="flex flex-wrap space-x-1.5">
        {selected.map(el => {
          return (
            <Capsule
              key={el.key}
              title={el.title}
              onDeselect={() => onDeselect?.(el)}
            />
          );
        })}
      </div>
      <Dropdown show={show} items={filteredItems} />
    </div>
  );
}
