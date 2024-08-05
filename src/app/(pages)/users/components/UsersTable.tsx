"use client";
import { User } from "@/models/user";
import { getUsersPage } from "@/services/users";
import SearchUser from "./SearchUser";
import Table from "./Table";
import { useEffect, useState } from "react";
import Paginator from "@/components/Paginator";

type UsersTableProps = { count?: string; page?: string };
export default function UsersTable(props: Readonly<UsersTableProps>) {
  const { count, page } = props;
  const [filter, setFilter] = useState<string>();
  const [users, setUsers] = useState<User[]>([]);
  const [numberOfPages, setNumberOfPages] = useState(0);

  let itemsPerPage = 10;
  let currentPage = 0;

  itemsPerPage = count ? parseInt(count) || itemsPerPage : itemsPerPage;
  currentPage = page ? parseInt(page) - 1 || currentPage : currentPage;

  const startIndex = currentPage * itemsPerPage + 1;

  useEffect(() => {
    const fetchUsers = async () => {
      const page = await getUsersPage(itemsPerPage, startIndex, filter);
      const { totalResults } = page;
      setNumberOfPages(Math.ceil(totalResults / itemsPerPage));
      setUsers(page.Resources);
    };
    fetchUsers();
  }, [itemsPerPage, startIndex, filter]);

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const handleFilterClear = () => {
    setFilter(undefined);
  };

  return (
    <div className="space-y-3">
      <SearchUser
        onFilter={handleFilterChange}
        onFilterClear={handleFilterClear}
      />
      <Table users={users}>
        <Paginator numberOfPages={numberOfPages} />
      </Table>
    </div>
  );
}
