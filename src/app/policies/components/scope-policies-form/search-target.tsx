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

type SearchEntityProps = {
  entityType: EntityType;
  onAddUser: (user: User) => void;
  onAddGroup: (group: Group) => void;
};

function SearchEntity(props: Readonly<SearchEntityProps>) {
  const { entityType, onAddUser, onAddGroup } = props;
  if (entityType === "user") {
    return <SearchUsers listId="account-group-users" onSelect={onAddUser} />;
  }
  if (entityType === "group") {
    return <SearchGroups listId="account-group-groups" onSelect={onAddGroup} />;
  }
  return null;
}

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
        <SearchEntity
          entityType={entityType}
          onAddUser={addUser}
          onAddGroup={addGroup}
        />
      )}
    </>
  );
}
