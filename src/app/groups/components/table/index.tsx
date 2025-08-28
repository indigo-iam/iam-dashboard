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
  const Labels = () => {
    return (
      <div className="flex grow flex-wrap items-center gap-2">
        {group["urn:indigo-dc:scim:schemas:IndigoGroup"].labels?.map(label => {
          return (
            <div
              className="text-secondary flex items-center gap-1 rounded-full bg-sky-400 px-2 py-0.5 text-sm"
              key={label.name}
            >
              <span>
                <b>{label.name}</b> {label.value}
              </span>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex grow flex-col">
        <div className="flex flex-col gap-2 lg:flex-row">
          <Link
            className="flex min-w-72 flex-col break-all hover:underline"
            href={`/groups/${group.id}`}
          >
            {group.displayName}
            <p className="text-gray dark:text-secondary/60 text-sm">
              {group.id}
            </p>
          </Link>
          <div className="flex grow items-center">
            <Labels />
          </div>
          <p className="text-gray dark:text-secondary/50 my-auto flex flex-col pr-2 text-sm">
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
        <p>No group found.</p>
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
