// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { fetchManagedGroups } from "@/services/groups";
import Link from "@/components/link";
import GroupOptions from "./options";
import { Suspense } from "react";

type RowProps = {
  groupId: string;
  groupName: string;
  isAdmin: boolean;
};

function Row(props: Readonly<RowProps>) {
  const { groupId, groupName, isAdmin } = props;
  return (
    <li className="iam-list-item">
      <div className="flex grow flex-col">
        <Link className="iam-link" href={`/groups/${groupId}`}>
          {groupName}
        </Link>
        <p className="text-sm font-light">{groupId}</p>
      </div>
      <GroupOptions groupId={groupId} groupName={groupName} isAdmin={isAdmin} />
    </li>
  );
}

type ContentProps = {
  userId: string;
  isAdmin: boolean;
};

async function Content(props: Readonly<ContentProps>) {
  const { userId, isAdmin } = props;
  const groups = await fetchManagedGroups(userId);

  if (groups.length === 0) {
    return null;
  }

  return (
    <div className="panel space-y-4">
      <h2>Managed groups</h2>
      <ul className="w-full">
        {groups.map(group => (
          <Row
            key={group.id}
            groupId={group.id}
            groupName={group.name}
            isAdmin={isAdmin}
          />
        ))}
      </ul>
    </div>
  );
}

type ManagedGroupProps = {
  userId: string;
  isAdmin: boolean;
};

export default async function ManagedGroups(
  props: Readonly<ManagedGroupProps>
) {
  const { userId, isAdmin } = props;
  return (
    <Suspense>
      <Content userId={userId} isAdmin={isAdmin} />
    </Suspense>
  );
}
