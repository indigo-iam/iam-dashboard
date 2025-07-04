// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "next/link";
import { Status } from "@/components/badges";
import { User } from "@/models/scim";
import { dateToHuman } from "@/utils/dates";
import UserOptions from "./options";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type RowProps = {
  user: User;
};

function Row(props: Readonly<RowProps>) {
  const { user } = props;
  const created = user.meta?.created
    ? dateToHuman(new Date(user.meta.created))
    : "N/A";
  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex grow flex-col">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            className="flex grow flex-col break-all hover:underline"
            href={`/users/${user.id}`}
          >
            {user.name?.formatted}
            <p className="text-gray dark:text-secondary/70 text-sm">
              {user.emails?.[0].value}
            </p>
          </Link>
          <div className="my-auto flex flex-col">
            <div className="inline-flex items-center gap-2 sm:flex-col sm:items-end sm:gap-0 sm:px-2">
              <Status active={user.active ?? false} />
              <p className="text-gray dark:text-secondary/50 py-1 text-sm whitespace-nowrap">
                Created {created}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <UserOptions user={user} />
      </div>
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
