// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { Button } from "@/components/buttons";
import { User } from "@/models/scim";
import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import AssignOwnerModal from "./assign-owner-modal";

type OwnersListProps = {
  owners: User[];
};

export default function OwnersList(props: Readonly<OwnersListProps>) {
  const [items, setItems] = useState(props.owners.map(o => o.name?.formatted));
  const [show, setShow] = useState(false);

  const removeItem = (index: number) => {
    setItems(items.toSpliced(index, 1));
  };

  const listItems = items.map((item, index) => (
    <li key={item} className="mt-1 flex flex-row items-center gap-2">
      <button
        type="button"
        onClick={() => removeItem(index)}
        className="bg-secondary-100 hover:bg-danger hover:text-secondary w-5 rounded"
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
        <Button className="btn-secondary" type="button" onClick={open}>
          <PlusIcon className="my-auto size-5" />
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
