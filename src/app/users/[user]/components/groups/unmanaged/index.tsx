// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ScimReference, User } from "@/models/scim";
import GroupOptions from "./options";

type RowProps = {
  user: User;
  groupRef: ScimReference;
};

function Row(props: Readonly<RowProps>) {
  const { user, groupRef } = props;
  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex grow flex-col font-bold">
        {groupRef.display}
        <small className="dark:text-extralight font-light">
          {groupRef.value}
        </small>
      </div>
      <GroupOptions groupRef={groupRef} user={user} />
    </li>
  );
}

type UserGroupsProps = {
  user: User;
};

export default function UnmanagedGroups(props: Readonly<UserGroupsProps>) {
  const { user } = props;
  const { groups } = user;
  if (!groups || groups.length === 0) {
    return (
      <div className="panel">
        <h2 className="border-b">User Groups</h2>
        No groups found.
      </div>
    );
  }

  return (
    <div className="panel">
      <h2 className="border-b">Joined Groups</h2>
      <ul className="w-full">
        {groups.map(g => (
          <Row key={g.value} user={user} groupRef={g} />
        ))}
      </ul>
    </div>
  );
}
