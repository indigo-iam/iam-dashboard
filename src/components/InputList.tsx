import { useRef, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Button from "@/components/Button";

interface InputListProps extends React.HTMLProps<HTMLInputElement> {
  items: string[];
  addItem: (value: string) => void;
  removeItem: (index: number) => void;
}

export default function InputList(props: Readonly<InputListProps>) {
  const { items, addItem, removeItem, name, ...inputProps } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  const listItems = props.items.map((item, index) => (
    <li key={item} className="mt-1 flex flex-row items-center gap-2 text-sm">
      <button
        type="button"
        onClick={() => props.removeItem(index)}
        className="w-5 rounded bg-secondary-100 hover:bg-danger hover:text-secondary"
      >
        <XMarkIcon />
      </button>
      <input
        value={item}
        name={name}
        contentEditable={false}
        type={inputProps.type}
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
      <div className="flex flex-row items-center gap-2">
        <input
          ref={inputRef}
          onChange={event => setValue(event.target.value)}
          className="w-full border p-2"
          {...inputProps}
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
