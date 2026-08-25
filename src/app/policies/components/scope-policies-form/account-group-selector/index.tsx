// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Select, SelectOption } from "@/components/form";
import { SearchUsers } from "@/app/components/search-users";
import { SearchGroups } from "@/app/users/[user]/components/groups/unmanaged/join-group-button/search-groups";
import { User } from "@/models/scim";
import { Group } from "@/models/groups";
import { AccountSelector, GroupSelector, ScopePolicy } from "@/models/scope-policies";

export type AccountGroupSelection = {
  user: AccountSelector | null;
  group: GroupSelector | null;
};

type AccountGroupSelectorProps = {
  policy?: ScopePolicy;
  onChange?: (selection: AccountGroupSelection) => void;
};

const entityOptions = [
  { id: "null", name: "NULL" },
  { id: "user", name: "USER" },
  { id: "group", name: "GROUP" },
];

export function AccountGroupSelector(props: Readonly<AccountGroupSelectorProps>) {
  const { policy, onChange } = props;

  let entitySelector = { id: "null", name: "NULL" };
  if (policy?.account && !policy?.group) {
    entitySelector = { id: "user", name: "USER" };
  } else if (!policy?.account && policy?.group) {
    entitySelector = { id: "group", name: "GROUP" };
  } else if (policy?.account && policy?.group) {
    throw new Error(
      "Policy group and account cannot both have value at the same time."
    );
  }

  const [entityType, setEntityType] = useState(entitySelector.id);
  const [selectedUser, setSelectedUser] = useState<AccountSelector | null>(policy?.account ?? null);
  const [selectedGroup, setSelectedGroup] = useState<GroupSelector | null>(policy?.group ?? null);

  useEffect(() => {
    onChange?.({ user: selectedUser, group: selectedGroup });
  }, [selectedUser, selectedGroup, onChange]);

  function addUser(user: User) {
    setSelectedUser({ uuid: user.id, username: user.userName });
  }

  function addGroup(group: Group) {
    setSelectedGroup({ uuid: group.id, name: group.displayName });
  }

  function removeUser() {
    setSelectedUser(null);
  }

  function removeGroup() {
    setSelectedGroup(null);
  }

  return (
    <>
      <div className="flex flex-row gap-2">
        <Select
          name="entityType"
          defaultValue={entitySelector}
          onChange={value => setEntityType(value.id)}
        >
          {entityOptions.map(ep => (
            <SelectOption key={ep.id} value={ep}>
              {ep.name}
            </SelectOption>
          ))}
        </Select>
      </div>

      {entityType === "user" && (
        <>
          <SearchUsers listId="account-group-users" onSelect={addUser} />
          <ul className="mt-2">
            {selectedUser && (
              <li key={selectedUser.uuid} className="mt-1 flex flex-row items-center gap-2">
                <button
                  title="Remove user"
                  type="button"
                  onClick={removeUser}
                  className="bg-secondary-100 hover:bg-danger hover:text-white dark:text-white/80 w-5 rounded dark:bg-transparent"
                >
                  <XMarkIcon />
                </button>
                <label>{selectedUser.username}</label>
              </li>
            )}
          </ul>
        </>
      )}

      {entityType === "group" && (
        <>
          <SearchGroups listId="account-group-groups" onSelect={addGroup} />
          <ul className="mt-2">
            {selectedGroup && (
              <li key={selectedGroup.uuid} className="mt-1 flex flex-row items-center gap-2">
                <button
                  title="Remove group"
                  type="button"
                  onClick={removeGroup}
                  className="bg-secondary-100 hover:bg-danger hover:text-white dark:text-white/80 w-5 rounded dark:bg-transparent"
                >
                  <XMarkIcon />
                </button>
                <label>{selectedGroup.name}</label>
              </li>
            )}
          </ul>
        </>
      )}
    </>
  );
}
