// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "@/components/link";
import { Status } from "@/components/badges";
import { NotFound } from "@/components/not-found";
import { ListItem, UnorderedList } from "@/components/list";
import { User } from "@/models/scim";
import { dateToHuman } from "@/utils/dates";

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
      </div>
      <div className="flex items-center gap-1">
        <div className="hidden lg:flex lg:flex-col lg:items-end lg:justify-center">
          <Status active={userIsActive} autoHide={true} />
        </div>
        <UserOptions
          userId={userId}
          userFormattedName={userFormattedName}
          userEmail={userEmail}
          userIsActive={userIsActive}
        />
      </div>
    </ListItem>
  );
}

type UsersTableProps = {
  users: User[];
};

export default function UsersTable(props: Readonly<UsersTableProps>) {
  const { users } = props;
  if (users.length === 0) {
    return <NotFound />;
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
