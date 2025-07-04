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
      <h2>Subgroups</h2>
      <SubgroupsTable group={group} />
      <AddSubgroupButton group={group} />
    </TabPanel>
  );
}
