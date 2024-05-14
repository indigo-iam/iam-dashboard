"use client";
import React, { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/16/solid";

export type MultiChoiceItemI = {
  key: string;
  title: string;
  subtitle?: string | null;
  onSelect?: (item: MultiChoiceItemI) => void;
  select: () => void;
};

export class MultiChoiceItem implements MultiChoiceItemI {
  key: string;
  title: string;
  subtitle?: string | null;
  onSelect?: (item: MultiChoiceItemI) => void;

  constructor(
    key: string,
    title: string,
    subtitle?: string | null,
    onSelect?: (item: MultiChoiceItemI) => void
  ) {
    this.key = key;
    this.title = title;
    this.subtitle = subtitle;
    this.onSelect = onSelect;
  }
  select() {
    this.onSelect?.(this);
  }
}

const Capsule = (props: { title: string; onDeselect?: () => void }) => {
  const { title, onDeselect } = props;
  return (
    <span className="infn-dropdown-capsule">
      {title}
      <button
        type="button"
        color="danger"
        className="my-auto ml-2 w-5"
        onClick={onDeselect}
      >
        <XCircleIcon />
      </button>
    </span>
  );
};

interface MultiChoiceDropdownProps {
  items: MultiChoiceItemI[];
  selected: MultiChoiceItemI[];
  onDeselect?: (item: MultiChoiceItemI) => void;
  placeholder?: string;
}

const ItemView = (props: { item: MultiChoiceItemI }) => {
  const { item } = props;
  const { title, subtitle } = item;
  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputSearch = e.relatedTarget as HTMLInputElement;
    if (inputSearch) {
      inputSearch.focus();
    }
  };

  const handleClick = () => {
    item.select();
  };

  return (
    <div
      className="infn-dropdown-item"
      tabIndex={0}
      onFocus={handleOnFocus}
      onClick={handleClick}
    >
      <div>{title}</div>
      {subtitle ? <small>{subtitle}</small> : null}
    </div>
  );
};

const DropdownContent = (props: { items: MultiChoiceItemI[] }) => {
  const { items } = props;
  return (
    <div className="infn-dropdown-content">
      {items.map(item => {
        return <ItemView key={item.key} item={item} />;
      })}
    </div>
  );
};

export const Dropdown = (props: {
  show: boolean;
  items: MultiChoiceItemI[];
}) => {
  const { show, ...other } = props;
  return (
    <div className={`infn-dropdown ${show ? "show" : "hide"}`}>
      <DropdownContent {...other} />
    </div>
  );
};

export const MultiChoiceDropdown = (props: MultiChoiceDropdownProps) => {
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
    <div className="infn-multichoice-dropdown">
      <input
        type="search"
        className="w-full infn-dropdown-search-bar"
        style={{ background: "transparent" }}
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
};
