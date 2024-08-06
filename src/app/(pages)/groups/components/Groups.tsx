"use client";
import Paginator from "@/components/Paginator";
import { Group } from "@/models/groups";
import { getGroupsPage } from "@/services/groups";
import { useCallback, useEffect, useState } from "react";
import GroupsTable from "./GroupsTable";
import SearchFilter from "@/components/SearchFilter";
import AddRootGroup from "./AddRootGroup";
import DeleteRootGroup from "./DeleteRootGroup";
import AddSubgroup from "./AddSubgroup";
import Panel from "@/components/Panel";

type GroupsProps = {
  count?: string;
  page?: string;
};
export function Groups(props: Readonly<GroupsProps>) {
  const { count, page } = props;
  const [filter, setFilter] = useState<string>();
  const [groups, setGroups] = useState<Group[]>([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [groupToDelete, setGroupToDelete] = useState<Group>();
  const [groupToExtend, setGroupToExtend] = useState<Group>();

  let itemsPerPage = 10;
  let currentPage = 0;

  itemsPerPage = count ? parseInt(count) || itemsPerPage : itemsPerPage;
  currentPage = page ? parseInt(page) - 1 || currentPage : currentPage;

  const startIndex = currentPage * itemsPerPage + 1;

  const fetchGroups = useCallback(async () => {
    const page = await getGroupsPage(itemsPerPage, startIndex, filter);
    const { totalResults } = page;
    setNumberOfPages(Math.ceil(totalResults / itemsPerPage));
    setGroups(page.Resources);
  }, [itemsPerPage, startIndex, filter]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const handleFilterClear = () => {
    setFilter(undefined);
  };

  const openDeleteGroupModal = (group: Group) => {
    setGroupToDelete(group);
  };

  const closeDeleteGroupModal = () => {
    setGroupToDelete(undefined);
  };

  const openAddSubgroupModal = (group: Group) => {
    setGroupToExtend(group);
  };

  const closeAddSubgroupModal = () => {
    setGroupToExtend(undefined);
  };

  return (
    <>
      <Panel>
        <SearchFilter
          onFilter={handleFilterChange}
          onFilterClear={handleFilterClear}
        />
        <GroupsTable
          groups={groups}
          onDeleteGroup={openDeleteGroupModal}
          onAddSubgroup={openAddSubgroupModal}
        ></GroupsTable>
        <Paginator numberOfPages={numberOfPages} />
      </Panel>
      <AddRootGroup onRootGroupAdded={fetchGroups} />
      <DeleteRootGroup
        show={!!groupToDelete}
        onClose={closeDeleteGroupModal}
        onDeleted={fetchGroups}
        group={groupToDelete}
      />
      <AddSubgroup
        show={!!groupToExtend}
        onClose={closeAddSubgroupModal}
        onSubgroupAdded={fetchGroups}
        rootGroup={groupToExtend}
      />
    </>
  );
}
