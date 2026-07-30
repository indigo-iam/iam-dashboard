// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import SubgroupsTable from "./components/table";
import AddSubgroupButton from "./components/add-subgroup-button";
import { fetchSubgroupsPage } from "@/services/groups";
import Paginator from "@/components/paginator";

type SubgroupsProps = {
  groupId: string;
  groupName: string;
  count: number;
  page: number;
};

export default async function Subgroups(props: Readonly<SubgroupsProps>) {
  const { groupId, groupName, count, page } = props;
  const subgroupsPage = await fetchSubgroupsPage(groupId, 1, 0);
  const numberOfPages = Math.ceil(subgroupsPage.totalResults / count);
  return (
    <TabPanel className="panel space-y-4">
      <div className="flex flex-wrap gap-2">
        <div className="flex grow items-center gap-2">
          <h2>Subgroups</h2>
          <div
            title="Number of subgroups of this group"
            className="middle my-auto rounded-full bg-gray-400 px-2 py-0.5 text-xs font-semibold text-white"
          >
            {subgroupsPage.totalResults}
          </div>
        </div>
        <AddSubgroupButton rootGroupId={groupId} rootGroupName={groupName} />
      </div>
      {subgroupsPage.totalResults > 0 ? (
        <div>
          <SubgroupsTable groupId={groupId} count={count} page={page} />
          <Paginator numberOfPages={numberOfPages} suffix="Subgroups" />
        </div>
      ) : (
        <p>This group has no subgroups.</p>
      )}
    </TabPanel>
  );
}
