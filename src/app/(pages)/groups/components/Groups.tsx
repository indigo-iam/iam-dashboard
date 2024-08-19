"use client";
import Paginator from "@/components/Paginator";
import SearchFilter from "@/components/SearchFilter";
import Panel from "@/components/Panel";
import { Group } from "@/models/groups";
import { getGroupsPage } from "@/services/groups";
import AddGroupModal from "./AddGroupModal";
import AddSubgroupModal from "./AddSubgroupModal";
import DeleteGroupModal from "./DeleteGroupModal";
import GroupsTable from "./GroupsTable";
import { useCallback, useEffect, useState } from "react";

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
      <AddGroupModal onGroupAdded={fetchGroups} />
      <DeleteGroupModal
        show={!!groupToDelete}
        onClose={closeDeleteGroupModal}
        onDeleted={fetchGroups}
        group={groupToDelete}
      />
      <AddSubgroupModal
        show={!!groupToExtend}
        onClose={closeAddSubgroupModal}
        onSubgroupAdded={fetchGroups}
        rootGroup={groupToExtend}
      />
    </>
  );
}
