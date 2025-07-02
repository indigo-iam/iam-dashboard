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
        <small className="dark:text-light-gray">{group.id}</small>
      </Link>
      <GroupOptions groupRef={groupRef} />
    </li>
  );
}

type ManagedGroupsProps = {
  user: User;
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
    <div className="panel">
      <h2 className="border-b">Managed Groups</h2>
      <ul className="w-full">
        {groups.map(group => (
          <Row key={group.id} group={group} />
        ))}
      </ul>
    </div>
  );
}
