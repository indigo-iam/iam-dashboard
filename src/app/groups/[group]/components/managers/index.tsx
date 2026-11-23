// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { UsersIcon } from "@heroicons/react/24/solid";

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
    <TabPanel>
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
        {managers.length > 0 && (
          <AssignGroupManagerButton
            groupId={groupId}
            groupName={groupName}
            groupDescription={groupDescription}
            variant="outline"
          />
        )}
      </div>
      {managers.length > 0 ? (
        <ManagersTable
          groupId={groupId}
          groupName={groupName}
          managers={managers}
        />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <UsersIcon className="size-16 text-gray-400" />
          <p>This group has no manager</p>
          <AssignGroupManagerButton
            groupId={groupId}
            groupName={groupName}
            groupDescription={groupDescription}
          />
        </div>
      )}
    </TabPanel>
  );
}
