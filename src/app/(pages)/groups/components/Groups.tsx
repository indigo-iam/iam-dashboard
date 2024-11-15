"use client";
import { Paginator } from "@/components/Table";
import { InputSearch } from "@/components/Inputs";
import { Panel } from "@/components/Layout";
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
      <InputSearch onChange={handleFilterChange} onClear={handleFilterClear} />
      <GroupsTable
        groups={groups}
        onGroupDeleted={fetchGroups}
        onSubgroupAdded={fetchGroups}
      />
      <Paginator numberOfPages={numberOfPages} />

      <AddGroupButton onGroupAdded={fetchGroups} />
    </>
  );
}
