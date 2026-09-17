// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";

import { User } from "@/models/scim";
import { Group } from "@/models/groups";
import { SearchUsers } from "@/app/components/search-users";
import { SearchGroups } from "@/app/users/[user]/components/groups/unmanaged/join-group-button/search-groups";

type Entity = {
  uuid: string;
  name: string;
};

type EntityType = "null" | "user" | "group";

type SearchTargetProps = {
  entityType: EntityType;
  initialEntity?: Entity | null;
  onChange: (entity: Entity | null) => void;
};

export function SearchTarget(props: Readonly<SearchTargetProps>) {
  const { entityType, initialEntity, onChange } = props;
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(
    initialEntity ?? null
  );

  function addUser(user: User) {
    const entity = {
      uuid: user.id,
      name: user.name?.formatted ?? "unknown user",
    };
    setSelectedEntity(entity);
    onChange(entity);
  }

  function addGroup(group: Group) {
    const entity = {
      uuid: group.id,
      name: group.displayName ?? "unknown group",
    };
    setSelectedEntity(entity);
    onChange(entity);
  }

  function unselectEntity() {
    setSelectedEntity(null);
    onChange(null);
  }

  const SearchEntity = () => {
    if (entityType === "user") {
      return <SearchUsers listId="account-group-users" onSelect={addUser} />;
    }
    if (entityType === "group") {
      return <SearchGroups listId="account-group-groups" onSelect={addGroup} />;
    }
    return null;
  };

  if (entityType === "null") {
    return;
  }

  return (
    <>
      {selectedEntity ? (
        <div className="mt-1 flex flex-row items-center gap-2">
          <button
            title={`Remove ${entityType}`}
            type="button"
            onClick={unselectEntity}
            className="bg-secondary-100 hover:bg-danger w-5 rounded hover:text-white dark:bg-transparent dark:text-white/80"
          >
            <XMarkIcon />
          </button>
          <p>{selectedEntity.name}</p>
        </div>
      ) : (
        <SearchEntity />
      )}
    </>
  );
}
