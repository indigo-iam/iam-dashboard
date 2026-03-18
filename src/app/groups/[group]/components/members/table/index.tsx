// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Group } from "@/models/groups";
import { fetchGroupMembersPage } from "@/services/groups";
import { ScimReference } from "@/models/scim";
import MemberOptions from "./options";

import Link from "next/link";

type RowProps = {
  userRef: ScimReference;
  group: Group;
};

function Row(props: Readonly<RowProps>) {
  const { userRef, group } = props;
  return (
    <li className="iam-list-item flex flex-row">
      <Link className="flex w-0 grow flex-col" href={`/users/${userRef.value}`}>
        <p className="truncate text-gray-950 dark:text-gray-200">
          {userRef.display}
        </p>
        <p className="truncate text-sm font-light">{userRef.value}</p>
      </Link>

      <MemberOptions userRef={userRef} group={group} />
    </li>
  );
}

type MembersProps = {
  group: Group;
  members: ScimReference[];
};
export default async function Members(props: Readonly<MembersProps>) {
  const { group } = props;
  // TODO: pagination
  const members = (await fetchGroupMembersPage(group.id)).Resources;

  if (members.length === 0) {
    return <p>This group has no members.</p>;
  }

  return (
    <ul className="w-full">
      {members.map(member => (
        <Row key={member.value} userRef={member} group={group} />
      ))}
    </ul>
  );
}
