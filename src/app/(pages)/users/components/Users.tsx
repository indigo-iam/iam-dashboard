"use client";
import { User } from "@/models/scim";
import { getUsersPage } from "@/services/users";
import { InputSearch } from "@/components/Inputs";
import UsersTable from "./UsersTable";
import { useCallback, useEffect, useState } from "react";
import { Paginator } from "@/components/Table";
import DeleteUser from "./DeleteUser";
import AddUser from "./AddUser";
import Panel from "@/components/Layout/Panel";

type UsersProps = { count?: string; page?: string };
export default function Users(props: Readonly<UsersProps>) {
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

  const fetchUsers = useCallback(async () => {
    const page = await getUsersPage(itemsPerPage, startIndex, filter);
    const { totalResults } = page;
    setNumberOfPages(Math.ceil(totalResults / itemsPerPage));
    setUsers(page.Resources);
  }, [itemsPerPage, startIndex, filter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
      <DeleteUser
        show={!!userToDelete}
        onClose={closeDeleteUserModal}
        onUserDeleted={fetchUsers}
        user={userToDelete}
      />
      <Panel>
        <InputSearch
          onChange={handleFilterChange}
          onClear={handleFilterClear}
        />
        <UsersTable users={users} onDeleteUser={openDeleteUserModal} />
        <Paginator numberOfPages={numberOfPages} />
        <AddUser onUserAdded={fetchUsers} />
      </Panel>
    </div>
  );
}
