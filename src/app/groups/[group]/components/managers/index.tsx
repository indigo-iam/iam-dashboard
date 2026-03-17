// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession, isUserAdmin } from "@/auth";
import { TabPanel } from "@/components/tabs";
import { Group } from "@/models/groups";
import { fetchGroupManagers } from "@/services/groups";
import ManagersTable from "./table/table";
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
  const managers = await fetchGroupManagers(group.id);
  if (!managers) {
    return (
      <TabPanel className="panel space-y-4">
        <h2 className="grow">Managers</h2>
        <p className="text-gray dark:text-white/60 p-2">
          This groups has no managers.
        </p>
      </TabPanel>
    );
  }
  return (
    <TabPanel className="panel space-y-4">
      <div className="flex">
        <h2 className="grow">Managers</h2>
        <AssignGroupManagerButton group={group} />
      </div>
      <ManagersTable group={group} managers={managers} />
    </TabPanel>
  );
}
