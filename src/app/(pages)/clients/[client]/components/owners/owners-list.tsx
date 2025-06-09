// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { User } from "@/models/scim";
import { SearchUsers } from "@/app/components/search-users";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

type OwnersListProps = {
  owners: User[];
  onClick?: (index: number) => void;
};

function OwnerList(props: Readonly<OwnersListProps>) {
  const { owners, onClick } = props;
  return (
    <ul>
      {owners.map((owner, index) => (
        <li key={owner.id} className="mt-1 flex flex-row items-center gap-2">
          <button
            type="button"
            onClick={() => onClick?.(index)}
            className="bg-secondary-100 hover:bg-danger hover:text-secondary w-5 rounded"
          >
            <XMarkIcon />
          </button>
          <b>{owner.name?.formatted}</b> ({owner.emails?.[0].value})
        </li>
      ))}
    </ul>
  );
}

type OwnersProps = {
  owners: User[];
};

export default function OwnersList(props: Readonly<OwnersProps>) {
  const [owners, setOwners] = useState(props.owners);

  const addOwner = (user: User) => {
    setOwners([...owners, user]);
  };

  const removeItem = (index: number) => {
    setOwners(owners.toSpliced(index, 1));
  };

  return (
    <div className="flex flex-col gap-2">
      <SearchUsers onSelect={addOwner} />
      <OwnerList owners={owners} onClick={removeItem} />
    </div>
  );
}
