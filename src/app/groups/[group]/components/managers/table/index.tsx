// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { User } from "@/models/scim";
import ManagerOptions from "./options";
import Link from "@/components/link";
import Paginator from "@/components/paginator";

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
  const [count, setCount] = useState(10);
  const [page, setPage] = useState(1);
  const numberOfPages = Math.ceil(managers.length / count);
  const goFirst = () => setPage(1);
  const goPrevious = () => setPage(Math.max(0, page - 1));
  const goNext = () => setPage(Math.min(page + 1, numberOfPages));
  const goLast = () => setPage(numberOfPages);
  const changeCount = (n: number) => {
    setCount(n);
    setPage(1);
  };
  const start = (page - 1) * count;
  const end = start + count;
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
            groupDescription={groupDescription}
          />
        ))}
      </ul>
      <Paginator
        numberOfPages={numberOfPages}
        overrides={{
          onFirst: goFirst,
          onPrevious: goPrevious,
          onNext: goNext,
          onLast: goLast,
          onCountChange: changeCount,
          currentPage: page,
          count,
        }}
      />
    </div>
  );
}
