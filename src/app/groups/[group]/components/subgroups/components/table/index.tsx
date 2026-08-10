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
      <div className="flex w-0 grow flex-col">
        <Link className="iam-link" href={`/groups/${groupRef.value}`}>
          {groupRef.display}
        </Link>
        <p className="truncate text-sm font-light">{groupRef.value}</p>
      </div>
      <SubgroupOptions groupRef={groupRef} />
    </li>
  );
}

type SubgroupsTableProps = {
  groupId: string;
  count: number;
  page: number;
};

export default async function SubgroupsTable(
  props: Readonly<SubgroupsTableProps>
) {
  const { groupId, count, page } = props;
  const startIndex = 1 + count * (page - 1);
  const firstPage = await fetchSubgroupsPage(groupId, count, startIndex);
  const subgroups = firstPage.Resources;
  return (
    <ul className="w-full">
      {subgroups.map(groupRef => (
        <Row key={groupRef.value} groupRef={groupRef} />
      ))}
    </ul>
  );
}
