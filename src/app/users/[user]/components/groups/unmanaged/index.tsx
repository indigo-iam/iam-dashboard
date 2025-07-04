// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ScimReference, User } from "@/models/scim";
import NextLink from "next/link";
import GroupOptions from "./options";

type RowProps = {
  user: User;
  groupRef: ScimReference;
  isAdmin?: boolean;
};

function Row(props: Readonly<RowProps>) {
  const { user, groupRef, isAdmin } = props;

  const StaticView = () => {
    return (
      <div className="flex grow flex-col">
        {groupRef.display}
        <p className="dark:text-secondary/60 text-sm">{groupRef.value}</p>
      </div>
    );
  };

  const LinkView = () => {
    return (
      <NextLink
        href={`/groups/${groupRef.value}`}
        className="flex grow flex-col hover:underline"
      >
        {groupRef.display}
        <p className="text-gray dark:text-secondary/60 text-sm">
          {groupRef.value}
        </p>
      </NextLink>
    );
  };

  return (
    <li className="iam-list-item flex flex-row">
      {isAdmin ? <LinkView /> : <StaticView />}
      <GroupOptions groupRef={groupRef} user={user} />
    </li>
  );
}

type UserGroupsProps = {
  user: User;
  isAdmin?: boolean;
};

export default function UnmanagedGroups(props: Readonly<UserGroupsProps>) {
  const { user, isAdmin } = props;
  const { groups } = user;
  if (!groups || groups.length === 0) {
    return (
      <div className="panel space-y-4">
        <h2>User Groups</h2>
        <p className="dark:text-secondary/60 p-2">No groups found.</p>
      </div>
    );
  }
  return (
    <div className="panel space-y-4">
      <h2>Joined Groups</h2>
      <ul className="w-full">
        {groups.map(g => (
          <Row key={g.value} user={user} groupRef={g} isAdmin={isAdmin} />
        ))}
      </ul>
    </div>
  );
}
