// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { ScimReference } from "@/models/scim";
import { fetchGroupsRequests } from "@/services/group-requests";
import UnmanagedGroups from "./unmanaged";
import ManagedGroups from "./managed";
import { GroupRequests } from "./requests";

type UserGroupsProps = {
  userId: string;
  userName: string;
  userDisplay: string;
  userFormattedName: string;
  userEmail: string;
  userGroups: ScimReference[];
  isAdmin: boolean;
};

export async function UserGroups(props: Readonly<UserGroupsProps>) {
  const {
    userId,
    userName,
    userDisplay,
    userFormattedName,
    userEmail,
    userGroups,
    isAdmin,
  } = props;
  const requestsPage = await fetchGroupsRequests(userName);
  const requests = requestsPage.Resources;
  return (
    <TabPanel className="space-y-4">
      <UnmanagedGroups
        userId={userId}
        userName={userName}
        userDisplay={userDisplay}
        userFormattedName={userFormattedName}
        userEmail={userEmail}
        userGroups={userGroups}
        isAdmin={isAdmin}
      />
      <ManagedGroups userId={userId} isAdmin={isAdmin} />
      {requests.length > 0 && (
        <GroupRequests userId={userId} requests={requests} isAdmin={isAdmin} />
      )}
    </TabPanel>
  );
}
