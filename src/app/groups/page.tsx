// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { redirect } from "next/navigation";
import { UserGroupIcon } from "@heroicons/react/24/solid";

import { getSession, isUserAdmin } from "@/auth";
import { InputQuery } from "@/components/inputs";
import Paginator from "@/components/paginator";
import { fetchManagedGroups, getGroupsPage } from "@/services/groups";
import {
  AddGroupButton,
  AdminGroupsTable,
  UserGroupsTable,
  UserManagedGroupsTable,
} from "./components";
import { fetchMe } from "@/services/me";
import JoinGroupButton from "../users/[user]/components/groups/join-group-button";

type GroupsProps = {
  searchParams?: Promise<{
    count?: string;
    page?: string;
    query?: string;
  }>;
};

async function AdminPage(props: Readonly<GroupsProps>) {
  const searchParams = await props.searchParams;
  const count = searchParams?.count ? parseInt(searchParams.count) : 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const query = searchParams?.query;
  const startIndex = 1 + count * (page - 1);
  const groupsPage = await getGroupsPage(count, startIndex, query);
  const numberOfPages = Math.ceil(groupsPage.totalResults / count);
  const groups = groupsPage.Resources;
  return (
    <section>
      <header className="section-header flex flex-wrap gap-2">
        <div className="flex grow gap-2">
          <UserGroupIcon className="size-5" />
          <h2 className="text-base font-normal">Groups</h2>
        </div>
        <InputQuery
          title="Search group"
          placeholder="Type to search a group"
          data-testid="search-group"
          aria-label="Search group"
        />
        <AddGroupButton />
      </header>
      <div className="container space-y-4">
        <div className="panel">
          <AdminGroupsTable groups={groups} />
        </div>
        <Paginator numberOfPages={numberOfPages} />
      </div>
    </section>
  );
}

async function UserPage() {
  const me = await fetchMe();
  const managedGroups = await fetchManagedGroups(me.id);
  const groups = me.groups ?? [];
  return (
    <section>
      <header className="section-header flex flex-wrap gap-2">
        <div className="flex grow gap-2">
          <UserGroupIcon className="size-5" />
          <h2 className="text-base font-normal">My groups</h2>
        </div>
        <JoinGroupButton user={me} />
      </header>
      <div className="container space-y-4">
        <div className="panel">
          <h3 className="py-2">Unmanaged groups</h3>
          {groups.length > 0 ? (
            <UserGroupsTable groupRefs={groups} />
          ) : (
            <p>You are not member of any groups.</p>
          )}
        </div>
        {managedGroups.length > 0 && (
          <div className="panel">
            <h3 className="py-2">Managed groups</h3>
            <UserManagedGroupsTable groups={managedGroups} />
          </div>
        )}
      </div>
    </section>
  );
}

export default async function GroupsPage(props: Readonly<GroupsProps>) {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const isAdmin = await isUserAdmin();
  if (isAdmin) {
    return <AdminPage searchParams={props.searchParams} />;
  } else {
    return <UserPage />;
  }
}
