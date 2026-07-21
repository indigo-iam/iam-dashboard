// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import ManagerOptions from "./options";
import Link from "@/components/link";

type RowProps = {
  userId: string;
  userFormattedName: string;
  userEmail: string;
  groupId: string;
  groupName: string;
  groupDescription?: string | null;
};

function Row(props: Readonly<RowProps>) {
  const {
    userId,
    userFormattedName,
    userEmail,
    groupId,
    groupName,
    groupDescription,
  } = props;
  return (
    <li className="iam-list-item">
      <Link className="flex w-0 grow flex-col" href={`/users/${userId}`}>
        <p className="truncate text-gray-950 dark:text-gray-200">
          {userFormattedName}
        </p>
        <p className="truncate text-sm font-light">{userEmail}</p>
      </Link>
      <ManagerOptions
        userId={userId}
        userFormattedName={userFormattedName}
        userEmail={userEmail}
        groupId={groupId}
        groupName={groupName}
        groupDescription={groupDescription}
      />
    </li>
  );
}

type ManagerTableProps = {
  groupId: string;
  groupName: string;
  groupDescription?: string | null;
  managers: User[];
};

export default function ManagersTable(props: Readonly<ManagerTableProps>) {
  const { groupId, groupName, groupDescription, managers } = props;
  if (managers.length === 0) {
    return <p>This group has no managers.</p>;
  }
  return (
    <ul className="w-full">
      {managers.map(manager => (
        <Row
          key={manager.id}
          userId={manager.id}
          userFormattedName={manager.name?.formatted ?? "unknown user"}
          userEmail={manager.emails?.[0].value ?? "unknown email"}
          groupId={groupId}
          groupName={groupName}
          groupDescription={groupDescription}
        />
      ))}
    </ul>
  );
}
