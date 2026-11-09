// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { User } from "@/models/scim";
import Link from "@/components/link";
import Paginator from "@/components/paginator";
import { usePaginator } from "@/components/paginator/hook";
import { ListItem, UnorderedList } from "@/components/list";

import ManagerOptions from "./options";

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
    <ListItem>
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
    </ListItem>
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
      <UnorderedList>
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
      </UnorderedList>
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
