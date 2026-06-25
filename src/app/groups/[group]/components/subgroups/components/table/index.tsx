// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ScimReference } from "@/models/scim";
import { fetchSubgroupsPage } from "@/services/groups";
import Link from "@/components/link";
import SubgroupOptions from "./options";

function Row(props: Readonly<{ groupRef: ScimReference }>) {
  const { groupRef } = props;
  return (
    <li className="iam-list-item">
      <Link
        className="flex w-0 grow flex-col"
        href={`/groups/${groupRef.value}`}
      >
        <p className="truncate text-gray-950 dark:text-gray-200">
          {groupRef.display}
        </p>
        <p className="truncate text-sm font-light">{groupRef.value}</p>
      </Link>
      <SubgroupOptions groupRef={groupRef} />
    </li>
  );
}

type SubgroupsTableProps = {
  groupId: string;
};

export default async function SubgroupsTable(
  props: Readonly<SubgroupsTableProps>
) {
  const { groupId } = props;
  // TODO: pagination
  const firstPage = await fetchSubgroupsPage(groupId);
  const subgroups = firstPage.Resources;

  if (subgroups.length === 0) {
    return <p>This group has no subgroups.</p>;
  }

  return (
    <ul className="w-full">
      {subgroups.map(groupRef => (
        <Row key={groupRef.value} groupRef={groupRef} />
      ))}
    </ul>
  );
}
