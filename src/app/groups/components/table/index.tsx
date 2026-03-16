// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "next/link";
import { Group } from "@/models/groups";
import GroupOptions from "./options";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type LabelsProps = {
  group: Group;
};

function Labels(props: Readonly<LabelsProps>) {
  const { group } = props;
  return (
    <div className="flex grow flex-wrap items-center gap-1">
      {group["urn:indigo-dc:scim:schemas:IndigoGroup"].labels?.map(label => {
        return (
          <div
            className="text-secondary flex items-center gap-1 rounded-full bg-sky-600 px-2 py-0.5 text-xs dark:bg-sky-400"
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
}

type RowProps = {
  group: Group;
};

function Row(props: Readonly<RowProps>) {
  const { group } = props;
  const created = group.meta?.created
    ? new Date(group.meta.created).toLocaleString()
    : "N/A";
  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex grow flex-col">
        <Link
          className="flex grow flex-col break-all lg:flex-row"
          href={`/groups/${group.id}`}
        >
          <div className="flex flex-col">
            {group.displayName}
            <p className="text-gray dark:text-secondary/60 text-sm font-light">
              {group["urn:indigo-dc:scim:schemas:IndigoGroup"].description}
            </p>
          </div>
          <div className="flex grow items-center">
            <Labels group={group} />
          </div>
          <p className="text-gray dark:text-secondary/50 my-auto flex flex-col py-1 pr-2 text-sm font-light">
            Created {created}
          </p>
        </Link>
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
