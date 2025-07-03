// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { User } from "@/models/scim";
import JoinGroupButton from "./join-group-button";
import UnmanagedGroups from "./unmanaged";
import ManagedGroups from "./managed";
import { auth } from "@/auth";

type UserGroupsProps = {
  user: User;
};

export async function UserGroups(props: Readonly<UserGroupsProps>) {
  const { user } = props;
  const session = await auth();
  const isAdmin = session?.is_admin;
  return (
    <TabPanel className="space-y-4">
      <JoinGroupButton user={user} isAdmin={isAdmin} />
      <UnmanagedGroups user={user} isAdmin={isAdmin} />
      <ManagedGroups user={user} />
    </TabPanel>
  );
}
