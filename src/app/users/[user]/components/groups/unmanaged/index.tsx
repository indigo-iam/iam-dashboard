// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "@/components/link";
import { ScimReference } from "@/models/scim";
import { makeScimReferenceForUser } from "@/utils/scim";
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
    <Link href={`/groups/${groupRef.value}`} className="flex grow flex-col">
      <p className="text-gray-950 dark:text-gray-100">{groupRef.display}</p>
      <p className="text-sm font-light">{groupRef.value}</p>
    </Link>
  );
}

type RowProps = {
  userRef: ScimReference;
  groupRef: ScimReference;
  isAdmin?: boolean;
};

function Row(props: Readonly<RowProps>) {
  const { userRef, groupRef, isAdmin } = props;
  return (
    <li className="iam-list-item">
      {isAdmin ? (
        <LinkView groupRef={groupRef} />
      ) : (
        <StaticView groupRef={groupRef} />
      )}
      <GroupOptions groupRef={groupRef} userRef={userRef} />
    </li>
  );
}

type UserGroupsProps = {
  userId: string;
  userFormattedName: string;
  userGroups?: ScimReference[];
  isAdmin?: boolean;
};

export default function UnmanagedGroups(props: Readonly<UserGroupsProps>) {
  const { userId, userFormattedName, userGroups, isAdmin } = props;
  const userRef = makeScimReferenceForUser(userId, userFormattedName);
  if (!userGroups || userGroups.length === 0) {
    return (
      <div className="panel space-y-4">
        <h2>Joined groups</h2>
        <p>No group found.</p>
      </div>
    );
  }
  return (
    <div className="panel space-y-4">
      <h2>Joined groups</h2>
      <ul className="w-full">
        {userGroups.map(g => (
          <Row key={g.value} userRef={userRef} groupRef={g} isAdmin={isAdmin} />
        ))}
      </ul>
    </div>
  );
}
