// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { UsersIcon } from "@heroicons/react/24/solid";

import { TabPanel } from "@/components/tabs";
import Paginator from "@/components/paginator";
import { fetchGroupMembersPage } from "@/services/groups";
import MembersTable from "./table";
import AddMemberButton from "./add-button";

type MembersProps = {
  groupName: string;
  groupId: string;
  groupDescription?: string | null;
  isAdmin: boolean;
  count: number;
  page: number;
};

export default async function Members(props: Readonly<MembersProps>) {
  const { groupId, groupName, groupDescription, isAdmin, count, page } = props;
  const membersPage = await fetchGroupMembersPage(groupId, 1, 0);
  const numberOfPages = Math.ceil(membersPage.totalResults / count);
  return (
    <TabPanel>
      {isAdmin ? (
        <div className="flex flex-wrap">
          <div className="flex-items flex grow gap-2">
            <h2>Members</h2>
            <div
              title="Number of members of this group"
              className="middle my-auto rounded-full bg-gray-400 px-2 py-0.5 text-xs font-semibold text-white"
            >
              {membersPage.totalResults}
            </div>
          </div>
          {membersPage.totalResults > 0 && (
            <AddMemberButton
              groupId={groupId}
              groupName={groupName}
              groupDescription={groupDescription}
              variant="outline"
            />
          )}
        </div>
      ) : (
        <h2 className="grow">Members</h2>
      )}
      {membersPage.totalResults > 0 ? (
        <div>
          <MembersTable
            groupId={groupId}
            groupDisplay={groupName}
            count={count}
            page={page}
          />
          <Paginator numberOfPages={numberOfPages} suffix="Members" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <UsersIcon className="size-16 text-gray-400" />
          <p>This group has no member</p>
          <AddMemberButton
            groupId={groupId}
            groupName={groupName}
            groupDescription={groupDescription}
          />
        </div>
      )}
    </TabPanel>
  );
}
