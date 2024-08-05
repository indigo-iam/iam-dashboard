"use client";
import Paginator from "@/components/Paginator";
import { Group } from "@/models/groups";
import { getGroupsPage } from "@/services/groups";
import { useEffect, useState } from "react";
import Table from "./Table";

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

  useEffect(() => {
    const fetchGroups = async () => {
      const page = await getGroupsPage(itemsPerPage, startIndex, filter);
      const { totalResults } = page;
      setNumberOfPages(Math.ceil(totalResults / itemsPerPage));
      setGroups(page.Resources);
    };
    fetchGroups();
  }, [itemsPerPage, startIndex, filter]);

  return (
    <Table groups={groups}>
      <Paginator numberOfPages={numberOfPages} />
    </Table>
  );
}
