// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { Group } from "@/models/groups";
import SubgroupsTable from "./components/table";
import AddSubgroupButton from "./components/add-subgroup-button";

type SubgroupsProps = {
  group: Group;
};

export default function Subgroups(props: Readonly<SubgroupsProps>) {
  const { group } = props;
  return (
    <TabPanel className="panel space-y-4">
      <div className="flex">
        <h2 className="grow">Subgroups</h2>
        <AddSubgroupButton group={group} />
      </div>
      <SubgroupsTable group={group} />
    </TabPanel>
  );
}
