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
      <div className="flex grow flex-col font-bold">
        {groupRef.display}
        <small className="dark:text-light-gray font-light">
          {groupRef.value}
        </small>
      </div>
    );
  };

  const LinkView = () => {
    return (
      <NextLink
        href={`/groups/${groupRef.value}`}
        className="flex grow flex-col font-medium hover:underline"
      >
        {groupRef.display}
        <small className="text-gray dark:text-light-gray font-light">
          {groupRef.value}
        </small>
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
        No groups found.
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
