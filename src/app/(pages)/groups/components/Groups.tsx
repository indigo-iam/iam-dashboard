"use client";
import Paginator from "@/components/Paginator";
import SearchFilter from "@/components/SearchFilter";
import Panel from "@/components/Panel";
import { Group } from "@/models/groups";
import { getGroupsPage } from "@/services/groups";
import AddGroupButton from "./AddGroupButton";
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

  return (
    <>
      <Panel>
        <SearchFilter
          onFilter={handleFilterChange}
          onFilterClear={handleFilterClear}
        />
        <GroupsTable
          groups={groups}
          onGroupDeleted={fetchGroups}
          onSubgroupAdded={fetchGroups}
        ></GroupsTable>
        <Paginator numberOfPages={numberOfPages} />
      </Panel>
      <AddGroupButton onGroupAdded={fetchGroups} />
    </>
  );
}
