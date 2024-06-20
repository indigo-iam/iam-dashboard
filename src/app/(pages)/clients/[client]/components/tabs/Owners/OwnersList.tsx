"use client";
import Button from "@/components/Button";
import { User } from "@/models/user";
import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import AssignOwnerModal from "./AssignOwnerModal";

type OwnersListProps = {
  owners: User[];
};

export default function OwnersList(props: Readonly<OwnersListProps>) {
  const [items, setItems] = useState(props.owners.map(o => o.name.formatted));
  const [show, setShow] = useState(false);

  const addItem = (item: string) => {
    setItems([...items, item]);
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
      {item}
    </li>
  ));

  const open = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <ul className="mt-2">{listItems}</ul>
      <div>
        <Button type="button" icon={<PlusIcon />} onClick={open}>
          Assign Owner
        </Button>
      </div>
      <AssignOwnerModal
        show={show}
        onClose={close}
        title="Assign Owner to Client"
      />
    </div>
  );
}
