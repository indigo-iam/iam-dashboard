// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ScimReference, User } from "@/models/scim";
import NextLink from "next/link";
import GroupOptions from "./options";

type StaticViewProps = {
  groupRef: ScimReference;
};

function StaticView(props: Readonly<StaticViewProps>) {
  const { groupRef } = props;
  return (
    <div className="flex grow flex-col">
      <p className="text-gray-950 dark:text-gray-100">{groupRef.display}</p>
      <p className="text-sm font-light">{groupRef.value}</p>
    </div>
  );
}

type LinkViewProps = {
  groupRef: ScimReference;
};

function LinkView(props: Readonly<LinkViewProps>) {
  const { groupRef } = props;
  return (
    <NextLink href={`/groups/${groupRef.value}`} className="flex grow flex-col">
      <p className="text-gray-950 dark:text-gray-100">{groupRef.display}</p>
      <p className="text-sm font-light">{groupRef.value}</p>
    </NextLink>
  );
}

type RowProps = {
  user: User;
  groupRef: ScimReference;
  isAdmin?: boolean;
};

function Row(props: Readonly<RowProps>) {
  const { user, groupRef, isAdmin } = props;
  return (
    <li className="iam-list-item flex flex-row">
      {isAdmin ? (
        <LinkView groupRef={groupRef} />
      ) : (
        <StaticView groupRef={groupRef} />
      )}
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
        <h2>Joined Groups</h2>
        <p>No groups found.</p>
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
