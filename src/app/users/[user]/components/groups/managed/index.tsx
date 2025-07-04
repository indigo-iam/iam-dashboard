// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { fetchManagedGroups } from "@/services/groups";
import { ManagedGroup } from "@/models/groups";
import Link from "next/link";
import GroupOptions from "./options";
import { makeScimReferenceFromManagedGroup } from "@/utils/scim";

type RowProps = {
  group: ManagedGroup;
};

function Row(props: Readonly<RowProps>) {
  const { group } = props;
  const groupRef = makeScimReferenceFromManagedGroup(group);
  return (
    <li className="iam-list-item flex flex-row">
      <Link
        className="flex grow flex-col hover:underline"
        href={`/groups/${group.id}`}
      >
        {group.name}
        <p className="text-gray dark:text-secondary/60 text-sm">{group.id}</p>
      </Link>
      <GroupOptions groupRef={groupRef} />
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
