// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Group } from "@/models/groups";
import { fetchGroupMembersPage } from "@/services/groups";
import MembersTable from "./table";
import AddMemberButton from "./add-button";

type MembersProps = {
  group: Group;
};

export default async function Members(props: Readonly<MembersProps>) {
  const { group } = props;
  // TODO: pagination
  const members = (await fetchGroupMembersPage(group.id)).Resources;
  return (
    <div className="panel space-y-4">
      <h2 className="border-b">Members</h2>
      <MembersTable group={group} members={members} />
      <AddMemberButton group={group} />
    </div>
  );
}
