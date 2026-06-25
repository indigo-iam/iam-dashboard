// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import SubgroupsTable from "./components/table";
import AddSubgroupButton from "./components/add-subgroup-button";
import { makeScimReferenceForGroup } from "@/utils/scim";

type SubgroupsProps = {
  groupId: string;
  groupName: string;
};

export default function Subgroups(props: Readonly<SubgroupsProps>) {
  const { groupId, groupName } = props;
  const groupRef = makeScimReferenceForGroup(groupId, groupName);
  return (
    <TabPanel className="panel space-y-4">
      <div className="flex flex-wrap gap-2">
        <h2 className="grow">Subgroups</h2>
        <AddSubgroupButton rootGroupRef={groupRef} />
      </div>
      <SubgroupsTable groupId={groupId} />
    </TabPanel>
  );
}
