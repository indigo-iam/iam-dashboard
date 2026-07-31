// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { fetchGroupMembersPage } from "@/services/groups";
import MemberOptions from "./options";

import Link from "next/link";

type RowProps = {
  userId: string;
  userDisplay: string;
  groupId: string;
  groupDisplay: string;
};

function Row(props: Readonly<RowProps>) {
  const { userId, userDisplay, groupId, groupDisplay } = props;
  return (
    <li className="iam-list-item">
      <div className="flex w-0 grow flex-col">
        <Link className="iam-link" href={`/users/${userId}`}>
          {userDisplay}
        </Link>
        <p className="truncate text-sm font-light">{userId}</p>
      </div>
      <MemberOptions
        userId={userId}
        userDisplay={userDisplay}
        groupId={groupId}
        groupDisplay={groupDisplay}
      />
    </li>
  );
}

type MembersProps = {
  groupId: string;
  groupDisplay: string;
  count: number;
  page: number;
};
export default async function Members(props: Readonly<MembersProps>) {
  const { groupId, groupDisplay, count, page } = props;
  const startIndex = 1 + count * (page - 1);
  const membersPage = await fetchGroupMembersPage(groupId, count, startIndex);
  const members = membersPage.Resources;
  return (
    <ul className="w-full">
      {members.map(member => (
        <Row
          key={member.value}
          userId={member.value}
          userDisplay={member.display}
          groupId={groupId}
          groupDisplay={groupDisplay}
        />
      ))}
    </ul>
  );
}
