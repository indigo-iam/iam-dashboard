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
      <div className="flex grow flex-col">
        <Link
          className="flex grow flex-col hover:underline"
          href={`/users/${userRef.value}`}
        >
          {userRef.display}
          <p className="text-gray dark:text-secondary-dark text-sm">
            {userRef.value}
          </p>
        </Link>
      </div>
      <div className="flex flex-col">
        <MemberOptions userRef={userRef} group={group} />
      </div>
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
    return (
      <p className="text-gray dark:text-secondary/60 p-2">
        This group has no members.
      </p>
    );
  }

  return (
    <ul className="w-full">
      {members.map(member => (
        <Row key={member.value} userRef={member} group={group} />
      ))}
    </ul>
  );
}
