// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { User } from "@/models/scim";
import ManagerOptions from "./options";
import Link from "@/components/link";
import Paginator from "@/components/paginator";
import { usePaginator } from "@/components/paginator/hook";

type RowProps = {
  userId: string;
  userFormattedName: string;
  userEmail: string;
  groupId: string;
  groupName: string;
};

function Row(props: Readonly<RowProps>) {
  const { userId, userFormattedName, userEmail, groupId, groupName } = props;
  return (
    <li className="iam-list-item">
      <div className="flex w-0 grow flex-col">
        <Link className="iam-link" href={`/users/${userId}`}>
          {userFormattedName}
        </Link>
        <p className="truncate text-sm font-light">{userEmail}</p>
      </div>
      <ManagerOptions
        userId={userId}
        userFormattedName={userFormattedName}
        userEmail={userEmail}
        groupId={groupId}
        groupName={groupName}
      />
    </li>
  );
}

type ManagerTableProps = {
  groupId: string;
  groupName: string;
  managers: User[];
};

export default function ManagersTable(props: Readonly<ManagerTableProps>) {
  const { groupId, groupName, managers } = props;
  const { count, numberOfPages, start, end, ...paginator } = usePaginator(
    managers.length
  );
  const managerSlice = managers.slice(start, end);
  return (
    <div className="space-y-2">
      <ul className="w-full">
        {managerSlice.map(manager => (
          <Row
            key={manager.id}
            userId={manager.id}
            userFormattedName={manager.name?.formatted ?? "unknown user"}
            userEmail={manager.emails?.[0].value ?? "unknown email"}
            groupId={groupId}
            groupName={groupName}
          />
        ))}
      </ul>
      <Paginator
        numberOfPages={numberOfPages}
        overrides={{
          count,
          ...paginator,
        }}
      />
    </div>
  );
}
