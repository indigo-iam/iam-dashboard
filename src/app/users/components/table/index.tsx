// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "next/link";
import { Status } from "@/components/badges";
import { User } from "@/models/scim";
import UserOptions from "./options";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type RowProps = {
  user: User;
};

function Row(props: Readonly<RowProps>) {
  const { user } = props;
  const created = user.meta?.created
    ? new Date(user.meta.created).toLocaleString()
    : "N/A";
  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex grow flex-col">
        <Link
          className="text-md flex grow flex-col break-all lg:flex-row"
          href={`/users/${user.id}`}
        >
          <div className="grow flex-col">
            {user.name?.formatted}
            <p className="text-gray dark:text-secondary/70 text-sm font-light">
              {user.emails?.[0].value}
            </p>
          </div>
          <div className="my-auto flex flex-col">
            <div className="inline-flex items-center gap-2 lg:flex-col lg:items-end lg:gap-1">
              <Status active={user.active ?? false} />
              <p className="text-gray dark:text-secondary/50 py-1 text-sm font-light whitespace-nowrap lg:p-0">
                Created {created}
              </p>
            </div>
          </div>
        </Link>
      </div>
      <UserOptions user={user} />
    </li>
  );
}

type UsersTableProps = {
  users: User[];
};

export default function UsersTable(props: Readonly<UsersTableProps>) {
  const { users } = props;
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <MagnifyingGlassIcon className="text-primary/60 size-16 dark:text-white/60" />
        <p className="dark:text-secondary/60 p-2">No user found.</p>
      </div>
    );
  }
  return (
    <ul className="w-full">
      {users.map(user => (
        <Row key={user.id} user={user} />
      ))}
    </ul>
  );
}
