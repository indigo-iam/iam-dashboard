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
import { AccountType } from "@/models/scope-policies";

type Entity = {
  uuid: string;
  name: string;
};

type SearchTargetProps = {
  accountType: AccountType;
  initialEntity: Entity | null;
  onChange: (entity: Entity | null) => void;
};

type SearchEntityProps = {
  accountType: AccountType;
  onAddUser: (user: User) => void;
  onAddGroup: (group: Group) => void;
};

function SearchEntity(props: Readonly<SearchEntityProps>) {
  const { accountType, onAddUser, onAddGroup } = props;
  if (accountType === "USER") {
    return <SearchUsers onSelect={onAddUser} />;
  }
  if (accountType === "GROUP") {
    return <SearchGroups onSelect={onAddGroup} />;
  }
  return null;
}

export function SearchTarget(props: Readonly<SearchTargetProps>) {
  const { accountType, initialEntity, onChange } = props;
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(
    initialEntity
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

  if (accountType === "ALL") {
    return;
  }

  if (selectedEntity) {
    return (
      <div className="mt-1 flex flex-row items-center gap-2 pt-1">
        <button
          title={`Remove ${accountType}`}
          type="button"
          onClick={unselectEntity}
          className="bg-secondary-100 hover:bg-danger w-5 rounded hover:text-white dark:bg-transparent dark:text-white/80"
        >
          <XMarkIcon />
        </button>
        <p>{selectedEntity.name}</p>
      </div>
    );
  }
  return (
    <SearchEntity
      accountType={accountType}
      onAddUser={addUser}
      onAddGroup={addGroup}
    />
  );
}
