// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { User } from "@/models/scim";
import JoinGroupButton from "./join-group-button";
import UnmanagedGroups from "./unmanaged";
import ManagedGroups from "./managed";
import { fetchGroupsRequests } from "@/services/group-requests";
import { GroupRequests } from "./requests";

type UserGroupsProps = {
  user: User;
  isAdmin: boolean;
};

export async function UserGroups(props: Readonly<UserGroupsProps>) {
  const { user, isAdmin } = props;
  const requestsPage = isAdmin
    ? await fetchGroupsRequests(user.name?.displayName)
    : await fetchGroupsRequests();
  const requests = requestsPage.Resources;
  return (
    <TabPanel className="space-y-4">
      <JoinGroupButton user={user} isAdmin={isAdmin} />
      {requests.length > 0 && <GroupRequests user={user} requests={requests} />}
      <UnmanagedGroups user={user} isAdmin={isAdmin} />
      <ManagedGroups user={user} />
    </TabPanel>
  );
}
