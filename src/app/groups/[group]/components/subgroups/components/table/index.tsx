// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import GroupOptions from "@/app/groups/components/table/options";
import { Group } from "@/models/groups";
import { ScimReference } from "@/models/scim";
import { fetchSubgroupsPage } from "@/services/groups";
import Link from "next/link";
import SubgroupOptions from "./options";

function Row(props: Readonly<{ groupRef: ScimReference }>) {
  const { groupRef } = props;
  return (
    <li className="iam-list-item flex flex-row">
      <Link
        className="flex grow flex-col hover:underline"
        href={`/groups/${groupRef.value}`}
      >
        {groupRef.display}
        <p className="text-gray dark:text-secondary-dark text-sm">
          {groupRef.value}
        </p>
      </Link>
      <SubgroupOptions groupRef={groupRef} />
    </li>
  );
}

type SubgroupsTableProps = {
  group: Group;
};

export default async function SubgroupsTable(
  props: Readonly<SubgroupsTableProps>
) {
  const { group } = props;
  // TODO: pagination
  const firstPage = await fetchSubgroupsPage(group.id);
  const subgroups = firstPage.Resources;

  if (subgroups.length === 0) {
    return (
      <p className="text-gray dark:text-secondary/60 p-2">
        This group has no subgroups.
      </p>
    );
  }

  return (
    <ul className="w-full">
      {subgroups.map(groupRef => (
        <Row key={groupRef.value} groupRef={groupRef} />
      ))}
    </ul>
  );
}
