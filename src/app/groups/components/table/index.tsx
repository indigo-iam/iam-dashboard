// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "next/link";
import { Group } from "@/models/groups";
import { dateToHuman } from "@/utils/dates";
import GroupOptions from "./options";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type RowProps = {
  group: Group;
};

function Row(props: Readonly<RowProps>) {
  const { group } = props;
  const created = group.meta?.created
    ? dateToHuman(new Date(group.meta.created))
    : "N/A";
  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex grow flex-col">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            className="flex grow flex-col break-all hover:underline"
            href={`/groups/${group.id}`}
          >
            {group.displayName}
            <p className="text-gray dark:text-secondary/60 text-sm">
              {group.id}
            </p>
          </Link>
          <p className="text-gray dark:text-secondary/50 my-auto flex flex-col text-sm">
            Created {created}
          </p>
        </div>
      </div>
      <GroupOptions group={group} />
    </li>
  );
}

type TableProps = {
  groups: Group[];
};

export default async function GroupsTable(props: Readonly<TableProps>) {
  const { groups } = props;
  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <MagnifyingGlassIcon className="text-primary/60 dark:text-light-gray/80 size-16" />
        <span>No group found.</span>
      </div>
    );
  }
  return (
    <ul className="w-full table-auto">
      {groups.map(group => (
        <Row key={group.id} group={group} />
      ))}
    </ul>
  );
}
