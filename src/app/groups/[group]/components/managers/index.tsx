// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession } from "@/auth";
import { TabPanel } from "@/components/tabs";
import { Group } from "@/models/groups";
import { fetchGroupManagers } from "@/services/groups";
import ManagersTable from "./table";
import AssignGroupManagerButton from "./assign-button";

import { redirect } from "next/navigation";

type ManagersProps = {
  group: Group;
};

export default async function Managers(props: Readonly<ManagersProps>) {
  const { group } = props;
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const managers = (await fetchGroupManagers(group.id)) ?? [];
  return (
    <TabPanel className="panel space-y-4">
      <div className="flex flex-wrap gap-2">
        <h2 className="grow">Managers</h2>
        <AssignGroupManagerButton group={group} />
      </div>
      <ManagersTable group={group} managers={managers} />
    </TabPanel>
  );
}
