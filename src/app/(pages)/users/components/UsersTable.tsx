"use client";
import { User } from "@/models/user";
import { getUsersPage } from "@/services/users";
import SearchFilter from "@/components/SearchFilter";
import Table from "./Table";
import { useEffect, useState } from "react";
import Paginator from "@/components/Paginator";
import DeleteUser from "./DeleteUser";
import AddUser from "./AddUser";

type UsersTableProps = { count?: string; page?: string };
export default function UsersTable(props: Readonly<UsersTableProps>) {
  const { count, page } = props;
  const [filter, setFilter] = useState<string>();
  const [users, setUsers] = useState<User[]>([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [userToDelete, setUserToDelete] = useState<User>();

  let itemsPerPage = 10;
  let currentPage = 0;

  itemsPerPage = count ? parseInt(count) || itemsPerPage : itemsPerPage;
  currentPage = page ? parseInt(page) - 1 || currentPage : currentPage;

  const startIndex = currentPage * itemsPerPage + 1;

  const fetchUsers = async () => {
    const page = await getUsersPage(itemsPerPage, startIndex, filter);
    const { totalResults } = page;
    setNumberOfPages(Math.ceil(totalResults / itemsPerPage));
    setUsers(page.Resources);
  };

  useEffect(() => {
    fetchUsers();
  }, [itemsPerPage, startIndex, filter]);

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const handleFilterClear = () => {
    setFilter(undefined);
  };

  const openDeleteUserModal = (user: User) => {
    setUserToDelete(user);
  };

  const closeDeleteUserModal = () => {
    setUserToDelete(undefined);
    setFilter(undefined);
  };

  return (
    <div className="space-y-3">
      <SearchFilter
        onFilter={handleFilterChange}
        onFilterClear={handleFilterClear}
      />
      <DeleteUser
        show={!!userToDelete}
        onClose={closeDeleteUserModal}
        onUserDeleted={fetchUsers}
        user={userToDelete}
      />
      <Table users={users} onDeleteUser={openDeleteUserModal}>
        <Paginator numberOfPages={numberOfPages} />
      </Table>
      <AddUser onUserAdded={fetchUsers} />
    </div>
  );
}
