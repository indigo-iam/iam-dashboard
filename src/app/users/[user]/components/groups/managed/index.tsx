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
};

function Row(props: Readonly<RowProps>) {
  const { groupId, groupName } = props;
  return (
    <li className="iam-list-item">
      <Link className="flex grow flex-col" href={`/groups/${groupId}`}>
        <p className="text-gray-950 dark:text-gray-100">{groupName}</p>
        <p className="text-sm font-light">{groupId}</p>
      </Link>
      <GroupOptions groupId={groupId} groupName={groupName} />
    </li>
  );
}

type ContentProps = {
  userId: string;
};

async function Content(props: Readonly<ContentProps>) {
  const { userId } = props;
  const groups = await fetchManagedGroups(userId);

  if (groups.length === 0) {
    return null;
  }

  return (
    <div className="panel space-y-4">
      <h2>Managed groups</h2>
      <ul className="w-full">
        {groups.map(group => (
          <Row key={group.id} groupId={group.id} groupName={group.name} />
        ))}
      </ul>
    </div>
  );
}

type ManagedGroupProps = {
  userId: string;
};

export default async function ManagedGroups(
  props: Readonly<ManagedGroupProps>
) {
  const { userId } = props;
  return (
    <Suspense>
      <Content userId={userId} />
    </Suspense>
  );
}
