// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Link from "@/components/link";
import { Status } from "@/components/badges";
import { ListItem, UnorderedList } from "@/components/list";
import { User } from "@/models/scim";
import UserOptions from "./options";
import { dateToHuman } from "@/utils/dates";

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
  const created = userCreatedAt ? dateToHuman(new Date(userCreatedAt)) : "N/A";
  return (
    <ListItem>
      <div className="flex w-0 grow flex-col space-y-2 lg:flex-row lg:space-y-0">
        <div className="flex grow flex-col gap-1 lg:w-0">
          <Link href={`/users/${userId}`}>{userFormattedName}</Link>
          <div className="flex flex-col">
            <div className="flex w-full items-center gap-1 text-xs font-light">
              <div className="lg:hidden">
                <Status active={userIsActive} autoHide={true} />
              </div>
              <p className="max-w-full truncate">
                {userEmail} · Created {created}
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-col lg:items-end lg:justify-center">
          <Status active={userIsActive} autoHide={true} />
        </div>
      </div>
      <UserOptions
        userId={userId}
        userFormattedName={userFormattedName}
        userEmail={userEmail}
        userIsActive={userIsActive}
      />
    </ListItem>
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
    <UnorderedList>
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
    </UnorderedList>
  );
}
