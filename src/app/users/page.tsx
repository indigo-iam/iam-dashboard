// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Layout } from "@/app/components/layout";
import { getUsersPage } from "@/services/users";
import { InputQuery } from "@/components/inputs";
import Paginator from "@/components/paginator";
import { AddUserButton, UsersTable } from "./components";
import { getSession, isUserAdmin } from "@/auth";
import { redirect } from "next/navigation";

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
    <Layout title="Users">
      <div className="space-y-4">
        <AddUserButton />
        <InputQuery
          title="Search client"
          placeholder="Type to search a user"
          data-testid="search-user"
          aria-label="Search user"
        />
        <div className="panel">
          <UsersTable users={users} />
        </div>
        <Paginator numberOfPages={numberOfPages} />
      </div>
    </Layout>
  );
}
