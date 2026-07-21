// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { fetchGroupMembersPage } from "@/services/groups";
import { ScimReference } from "@/models/scim";
import MemberOptions from "./options";

import Link from "next/link";

type RowProps = {
  userId: string;
  userDisplay: string;
  groupId: string;
  groupDisplay: string;
  groupDescription?: string | null;
};

function Row(props: Readonly<RowProps>) {
  const { userId, userDisplay, groupId, groupDisplay, groupDescription } =
    props;
  return (
    <li className="iam-list-item">
      <Link className="flex w-0 grow flex-col" href={`/users/${userId}`}>
        <p className="truncate text-gray-950 dark:text-gray-200">
          {userDisplay}
        </p>
        <p className="truncate text-sm font-light">{userId}</p>
      </Link>

      <MemberOptions
        userId={userId}
        userDisplay={userDisplay}
        groupId={groupId}
        groupDisplay={groupDisplay}
        groupDescription={groupDescription}
      />
    </li>
  );
}

type MembersProps = {
  groupId: string;
  groupDisplay: string;
  groupDescription?: string | null;
  members: ScimReference[];
};
export default async function Members(props: Readonly<MembersProps>) {
  const { groupId, groupDisplay, groupDescription } = props;
  // TODO: pagination
  const members = (await fetchGroupMembersPage(groupId)).Resources;

  if (members.length === 0) {
    return <p>This group has no members.</p>;
  }

  return (
    <ul className="w-full">
      {members.map(member => (
        <Row
          key={member.value}
          userId={member.value}
          userDisplay={member.display}
          groupId={groupId}
          groupDisplay={groupDisplay}
          groupDescription={groupDescription}
        />
      ))}
    </ul>
  );
}
