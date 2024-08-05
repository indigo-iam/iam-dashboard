"use client";
import Paginator from "@/components/Paginator";
import { Group } from "@/models/groups";
import { getGroupsPage } from "@/services/groups";
import { useCallback, useEffect, useState } from "react";
import Table from "./Table";
import SearchFilter from "@/components/SearchFilter";
import AddRootGroup from "./AddRootGroup";
import DeleteRootGroup from "./DeleteRootGroup";

type GroupsTableProps = {
  count?: string;
  page?: string;
};
export default function GroupsTable(props: Readonly<GroupsTableProps>) {
  const { count, page } = props;
  const [filter, setFilter] = useState<string>();
  const [groups, setGroups] = useState<Group[]>([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [groupToDelete, setGroupToDelete] = useState<Group>();

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

  return (
    <div className="space-y-3">
      <SearchFilter
        onFilter={handleFilterChange}
        onFilterClear={handleFilterClear}
      />
      <Table groups={groups} onDeleteGroup={openDeleteGroupModal}>
        <Paginator numberOfPages={numberOfPages} />
      </Table>
      <AddRootGroup onRootGroupAdded={fetchGroups} />
      <DeleteRootGroup
        show={!!groupToDelete}
        onClose={closeDeleteGroupModal}
        onDeleted={fetchGroups}
        group={groupToDelete}
      />
    </div>
  );
}
