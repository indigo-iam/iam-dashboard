// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import JoinGroupButton from "./join-group-button";
import UnmanagedGroups from "./unmanaged";
import ManagedGroups from "./managed";
import { TabPanel } from "@/components/tabs";

type UserGroupsProps = {
  user: User;
};

export function UserGroups(props: Readonly<UserGroupsProps>) {
  const { user } = props;
  return (
    <TabPanel className="space-y-4">
      <JoinGroupButton user={user} />
      <UnmanagedGroups user={user} />
      <ManagedGroups user={user} />
    </TabPanel>
  );
}
