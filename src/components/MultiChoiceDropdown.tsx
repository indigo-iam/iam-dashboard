import React, { useEffect, useState } from "react";

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

interface MultiChoiceDropdownProps {
  items: MultiChoiceItemI[];
  selected: MultiChoiceItemI[];
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
  const { items, selected, placeholder } = props;
  const [show, setShow] = useState(false);

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
  return (
    <div className="infn-multichoice-dropdown">
      <input
        type="search"
        className="infn-input-search"
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <div className="d-flex">
        {selected.map(el => {
          return <div key={el.key}>{el.title}</div>;
        })}
      </div>
      <Dropdown show={show} items={items} />
    </div>
  );
};
