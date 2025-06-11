// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { dateToHuman } from "@/utils/dates";
import Link from "next/link";
import UserOptions from "./options";
import { Status } from "@/components/badges";

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
            className="flex grow flex-col font-bold break-all hover:underline"
            href={`/users/${user.id}`}
          >
            {user.name?.formatted}
            <small className="dark:text-extralight font-light">
              {user.emails?.[0].value}
            </small>
          </Link>
          <div className="my-auto flex grow flex-col">
            <div className="inline-flex gap-2 sm:flex-col sm:items-end sm:gap-0 sm:px-2">
              <Status active={user.active ?? false} />
              <small className="dark:text-extralight font-light">
                Created {created}
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
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
  return (
    <ul className="w-full">
      {users.map(user => (
        <Row key={user.id} user={user} />
      ))}
    </ul>
  );
}
