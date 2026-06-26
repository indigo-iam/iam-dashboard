// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { fetchGroupMembersPage } from "@/services/groups";
import MembersTable from "./table";
import AddMemberButton from "./add-button";

type MembersProps = {
  groupName: string;
  groupId: string;
  groupDescription?: string | null;
  isAdmin?: boolean;
};

export default async function Members(props: Readonly<MembersProps>) {
  const { groupId, groupName, groupDescription, isAdmin } = props;
  // TODO: pagination
  const members = (await fetchGroupMembersPage(groupId)).Resources;
  return (
    <TabPanel className="panel space-y-4">
      {isAdmin ? (
        <div className="flex flex-wrap">
          <h2 className="grow">Members</h2>
          <AddMemberButton
            groupId={groupId}
            groupName={groupName}
            groupDescription={groupDescription}
          />
        </div>
      ) : (
        <h2 className="grow">Members</h2>
      )}
      <MembersTable
        groupId={groupId}
        groupName={groupName}
        groupDescription={groupDescription}
        members={members}
      />
    </TabPanel>
  );
}
