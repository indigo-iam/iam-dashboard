// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession, isUserAdmin } from "@/auth";
import { InputQuery } from "@/components/inputs";
import Paginator from "@/components/paginator";
import { getUsersPage } from "@/services/users";
import { AddUserButton, UsersTable } from "./components";

import { redirect } from "next/navigation";
import { UsersIcon } from "@heroicons/react/24/solid";

type UsersProps = {
  searchParams?: Promise<{
    count?: string;
    page?: string;
    query?: string;
  }>;
};

export default async function UsersPage(props: Readonly<UsersProps>) {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    redirect("/users/me");
  }
  const searchParams = await props.searchParams;
  const count = searchParams?.count ? parseInt(searchParams.count) : 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const query = searchParams?.query;
  const startIndex = 1 + count * (page - 1);
  const usersPage = await getUsersPage(count, startIndex, query);
  const numberOfPages = Math.ceil(usersPage.totalResults / count) || 1;
  const users = usersPage.Resources;
  return (
    <section>
      <header className="section-header">
        <UsersIcon className="size-5" />
        <h2 className="text-base font-normal">Users</h2>
      </header>
      <div className="content">
        <div className="flex items-center justify-between gap-2">
          <InputQuery
            title="Search client"
            placeholder="Type to search a user"
            data-testid="search-user"
            aria-label="Search user"
          />
          <AddUserButton />
        </div>
        <div className="panel">
          <UsersTable users={users} />
        </div>
        <Paginator numberOfPages={numberOfPages} />
      </div>
    </section>
  );
}
