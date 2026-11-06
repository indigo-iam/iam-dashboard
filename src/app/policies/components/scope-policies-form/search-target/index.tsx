// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { User } from "@/models/scim";
import { Group } from "@/models/groups";
import { SearchUsers } from "@/app/components/search-users";
import { SearchGroups } from "@/app/users/[user]/components/groups/unmanaged/join-group-button/search-groups";
import { AccountType } from "@/models/scope-policies";

type Entity = {
  uuid: string;
  name: string;
};

type SearchEntityProps = {
  defaultValue?: string;
  accountType: AccountType;
  onAddUser: (user: User | null) => void;
  onAddGroup: (group: Group | null) => void;
  disabled?: boolean;
};

function SearchEntity(props: Readonly<SearchEntityProps>) {
  const { defaultValue, accountType, onAddUser, onAddGroup, disabled } = props;
  if (accountType === "USER") {
    return (
      <SearchUsers
        defaultValue={defaultValue}
        onSelect={onAddUser}
        disabled={disabled}
      />
    );
  }
  if (accountType === "GROUP") {
    return (
      <SearchGroups
        defaultValue={defaultValue}
        onSelect={onAddGroup}
        disabled={disabled}
      />
    );
  }
  return null;
}

type SearchTargetProps = {
  accountType: AccountType;
  defaultValue: Entity | null;
  onChange: (entity: Entity | null) => void;
  disabled?: boolean;
};

export function SearchTarget(props: Readonly<SearchTargetProps>) {
  const { accountType, defaultValue, onChange, disabled } = props;

  function addUser(user: User | null) {
    if (user) {
      const entity = {
        uuid: user.id,
        name: user.name?.formatted ?? "unknown user",
      };
      onChange(entity);
    } else {
      onChange(null);
    }
  }

  function addGroup(group: Group | null) {
    if (group) {
      const entity = {
        uuid: group.id,
        name: group.displayName ?? "unknown group",
      };
      onChange(entity);
    } else {
      onChange(null);
    }
  }

  if (accountType === "ALL") {
    return;
  }

  return (
    <SearchEntity
      defaultValue={defaultValue?.name}
      accountType={accountType}
      onAddUser={addUser}
      onAddGroup={addGroup}
      disabled={disabled}
    />
  );
}
