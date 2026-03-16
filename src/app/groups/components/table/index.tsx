// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { Group, ManagedGroup } from "@/models/groups";
import { ScimReference } from "@/models/scim";
import GroupOptions from "./options";

type LabelsProps = {
  group: Group;
};

function Labels(props: Readonly<LabelsProps>) {
  const { group } = props;
  const labels = group["urn:indigo-dc:scim:schemas:IndigoGroup"].labels;
  if (!labels || labels.length === 0) {
    return null;
  }
  return (
    <div className="flex grow flex-wrap items-center gap-1 pt-1.5">
      {labels?.map(label => {
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
          className="flex grow flex-col gap-0 break-all lg:flex-row lg:gap-2"
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

type AdminGroupsTableProps = {
  groups: Group[];
};

export async function AdminGroupsTable(props: Readonly<AdminGroupsTableProps>) {
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

type UserGroupsTablesProps = {
  groupRefs: ScimReference[];
};

export async function UserGroupsTable(props: Readonly<UserGroupsTablesProps>) {
  const { groupRefs } = props;
  return (
    <ul>
      {groupRefs.map(g => {
        return (
          <li key={g.value} className="iam-list-item">
            <div className="flex flex-col">
              <p>{g.display}</p>
              <p className="text-light dark:text-secondary/60 text-sm font-light">
                {g.value}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

type UserManagedGroupsTableProps = {
  groups: ManagedGroup[];
};

export async function UserManagedGroupsTable(
  props: Readonly<UserManagedGroupsTableProps>
) {
  const { groups } = props;
  return (
    <ul>
      {groups.map(g => {
        return (
          <li key={g.id} className="iam-list-item">
            <Link className="w-full" href={`/groups/${g.id}`}>
              <p>{g.name}</p>
              <p className="text-light dark:text-secondary/60 text-sm font-light">
                {g.id}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
