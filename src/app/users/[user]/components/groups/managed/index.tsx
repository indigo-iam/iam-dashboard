// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { fetchManagedGroups } from "@/services/groups";
import { ManagedGroup } from "@/models/groups";
import Link from "next/link";
import GroupOptions from "./options";

type RowProps = {
  group: ManagedGroup;
};

function Row(props: Readonly<RowProps>) {
  const { group } = props;
  return (
    <li className="iam-list-item flex flex-row">
      <Link className="flex grow flex-col" href={`/groups/${group.id}`}>
        <p className="text-gray-950 dark:text-gray-100">{group.name}</p>
        <p className="text-sm font-light">{group.id}</p>
      </Link>
      <GroupOptions group={group} />
    </li>
  );
}

type ManagedGroupsProps = {
  user: User;
  isAdmin?: boolean;
};

export default async function ManagedGroups(
  props: Readonly<ManagedGroupsProps>
) {
  const { user } = props;
  const groups = await fetchManagedGroups(user.id);

  if (groups.length === 0) {
    return null;
  }

  return (
    <div className="panel space-y-4">
      <h2>Managed Groups</h2>
      <ul className="w-full">
        {groups.map(group => (
          <Row key={group.id} group={group} />
        ))}
      </ul>
    </div>
  );
}
