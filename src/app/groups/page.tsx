// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getGroupsPage } from "@/services/groups";
import { AddGroupButton, GroupsTable } from "./components";
import { InputQuery } from "@/components/inputs";
import Paginator from "@/components/paginator";
import { UserGroupIcon } from "@heroicons/react/24/solid";

type GroupsProps = {
  searchParams?: Promise<{
    count?: string;
    page?: string;
    query?: string;
  }>;
};

export default async function GroupsPage(props: Readonly<GroupsProps>) {
  const searchParams = await props.searchParams;
  const count = searchParams?.count ? parseInt(searchParams.count) : 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const query = searchParams?.query;
  const startIndex = 1 + count * (page - 1);
  const groupsPage = await getGroupsPage(count, startIndex, query);
  const numberOfPages = Math.ceil(groupsPage.totalResults / count);
  const groups = groupsPage.Resources;
  return (
    <section className="container">
      <header className="section-header">
        <div className="flex grow gap-2">
          <UserGroupIcon className="size-5" />
          <h2 className="text-base font-normal">Groups</h2>
        </div>
        <AddGroupButton />
      </header>
      <div className="content space-y-4">
        <InputQuery
          title="Search group"
          placeholder="Type to search a group"
          data-testid="search-group"
          aria-label="Search group"
        />
        <div className="panel">
          <GroupsTable groups={groups} />
        </div>
        <Paginator numberOfPages={numberOfPages} />
      </div>
    </section>
  );
}
