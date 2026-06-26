// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession } from "@/auth";
import { TabPanel } from "@/components/tabs";
import { fetchGroupManagers } from "@/services/groups";
import ManagersTable from "./table";
import AssignGroupManagerButton from "./assign-button";

import { redirect } from "next/navigation";

type ManagersProps = {
  groupId: string;
  groupName: string;
  groupDescription?: string | null;
};

export default async function Managers(props: Readonly<ManagersProps>) {
  const { groupId, groupName, groupDescription } = props;
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const managers = (await fetchGroupManagers(groupId)) ?? [];
  return (
    <TabPanel className="panel space-y-4">
      <div className="flex flex-wrap gap-2">
        <h2 className="grow">Managers</h2>
        <AssignGroupManagerButton
          groupId={groupId}
          groupName={groupName}
          groupDescription={groupDescription}
        />
      </div>
      <ManagersTable
        groupId={groupId}
        groupName={groupName}
        groupDescription={groupDescription}
        managers={managers}
      />
    </TabPanel>
  );
}
