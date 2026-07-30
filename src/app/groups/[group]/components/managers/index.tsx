// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { fetchGroupManagers } from "@/services/groups";
import ManagersTable from "./table";
import AssignGroupManagerButton from "./assign-button";

type ManagersProps = {
  groupId: string;
  groupName: string;
  groupDescription?: string | null;
};

export default async function Managers(props: Readonly<ManagersProps>) {
  const { groupId, groupName, groupDescription } = props;
  const managers = (await fetchGroupManagers(groupId)) ?? [];
  return (
    <TabPanel className="panel space-y-4">
      <div className="flex flex-wrap gap-2">
        <div className="flex grow items-center gap-2">
          <h2>Managers</h2>
          <div
            title="Number of managers of this group"
            className="middle my-auto rounded-full bg-gray-400 px-2 py-0.5 text-xs font-semibold text-white"
          >
            {managers.length}
          </div>
        </div>
        <AssignGroupManagerButton
          groupId={groupId}
          groupName={groupName}
          groupDescription={groupDescription}
        />
      </div>
      {managers.length > 0 ? (
        <ManagersTable
          groupId={groupId}
          groupName={groupName}
          groupDescription={groupDescription}
          managers={managers}
        />
      ) : (
        <p>This group has no managers.</p>
      )}
    </TabPanel>
  );
}
