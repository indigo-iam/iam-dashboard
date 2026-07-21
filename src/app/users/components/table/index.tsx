// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Link from "@/components/link";
import { Status } from "@/components/badges";
import { User } from "@/models/scim";
import UserOptions from "./options";

type RowProps = {
  userId: string;
  userFormattedName: string;
  userEmail: string;
  userIsActive: boolean;
  userCreatedAt?: string;
};

function Row(props: Readonly<RowProps>) {
  const { userId, userFormattedName, userEmail, userIsActive, userCreatedAt } =
    props;
  const created = userCreatedAt
    ? new Date(userCreatedAt).toDateString()
    : "N/A";
  return (
    <li className="iam-list-item lg:gap-2">
      <Link
        className="text-md flex grow flex-col break-all lg:flex-row"
        href={`/users/${userId}`}
      >
        <div className="grow flex-col">
          <p className="text-gray-950 dark:text-gray-100">
            {userFormattedName}
          </p>
          <p className="text-sm font-light">{userEmail}</p>
        </div>
        <div className="my-auto flex flex-col">
          <div className="flew-wrap flex items-center gap-2 lg:flex-col lg:items-end lg:gap-1">
            <Status active={userIsActive} autoHide={true} />
            <p className="py-1 text-xs font-light lg:p-0">Created {created}</p>
          </div>
        </div>
      </Link>
      <UserOptions
        userId={userId}
        userFormattedName={userFormattedName}
        userEmail={userEmail}
        userIsActive={userIsActive}
      />
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
        <MagnifyingGlassIcon className="size-16" />
        <p className="p-2 dark:text-white/60">No user found.</p>
      </div>
    );
  }
  return (
    <ul className="w-full">
      {users.map(user => (
        <Row
          key={user.id}
          userId={user.id}
          userFormattedName={user.name?.formatted ?? "unknown user"}
          userEmail={user.emails?.[0].value ?? "unknown email"}
          userIsActive={user.active ?? false}
          userCreatedAt={user.meta?.created}
        />
      ))}
    </ul>
  );
}
