// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { redirect } from "next/navigation";
import { UserGroupIcon } from "@heroicons/react/24/solid";

import { getSession, isUserAdmin } from "@/auth";
import { Container, Header, Panel, Section } from "@/components/layout";
import { InputQuery } from "@/components/inputs";
import Paginator from "@/components/paginator";
import { fetchManagedGroups, getGroupsPage } from "@/services/groups";
import { fetchGroupsRequests } from "@/services/group-requests";
import { fetchMe } from "@/services/me";
import {
  AddGroupButton,
  AdminGroupsTable,
  GroupRequestsTable,
  UserGroupsTable,
  UserManagedGroupsTable,
} from "./components";
import JoinGroupButton from "@/app/users/[user]/components/groups/unmanaged/join-group-button";

type GroupsProps = {
  searchParams?: Promise<{
    count?: string;
    page?: string;
    query?: string;
  }>;
};

async function AdminPage(props: Readonly<GroupsProps>) {
  const searchParams = await props.searchParams;
  const count = searchParams?.count ? Number.parseInt(searchParams.count) : 10;
  const page = searchParams?.page ? Number.parseInt(searchParams.page) : 1;
  const query = searchParams?.query;
  const startIndex = 1 + count * (page - 1);
  const groupsPage = await getGroupsPage(count, startIndex, query);
  const numberOfPages = Math.ceil(groupsPage.totalResults / count);
  const groups = groupsPage.Resources;
  return (
    <Section>
      <Header>
        <div className="flex grow items-center gap-2">
          <UserGroupIcon className="size-5" />
          <h2 className="text-base font-normal">Groups</h2>
          <div
            title="Number of groups in this organization"
            className="middle rounded-full bg-gray-400 px-2 py-0.5 text-xs font-semibold text-white"
          >
            {groupsPage.totalResults}
          </div>
        </div>
        <InputQuery
          title="Search group"
          placeholder="Type to search a group"
          data-testid="search-group"
          aria-label="Search group"
        />
        <AddGroupButton />
      </Header>
      <Container>
        <Panel>
          <AdminGroupsTable groups={groups} />
        </Panel>
        <Paginator numberOfPages={numberOfPages} />
      </Container>
    </Section>
  );
}

async function UserPage() {
  const me = await fetchMe();
  const managedGroups = await fetchManagedGroups(me.id);
  const requestsPage = await fetchGroupsRequests();
  const requests = requestsPage.Resources;
  const groups = me.groups ?? [];
  const userId = me.id;
  const userName = me.userName ?? "unknown userName";
  const userFormattedName = me.name?.displayName ?? "unknown user";
  const userEmail = me.emails?.[0].value ?? "unknown email";

  if (managedGroups.length + groups.length + requests.length === 0) {
    return (
      <Section>
        <Header>
          <UserGroupIcon className="size-5" />
          <h2 className="text-base font-normal">My groups</h2>
        </Header>
        <Container>
          <div className="mt-16 flex items-center justify-between">
            <div className="space-y-8">
              <div className="space-y-2">
                <h2>Join a group</h2>
                <p className="text-gray-500">
                  Send a request to join a group and have access to its
                  protected resources.
                </p>
              </div>
              <JoinGroupButton
                userId={userId}
                userName={userName}
                userFormattedName={userFormattedName}
                userEmail={userEmail}
              />
            </div>
            <UserGroupIcon className="size-36 flex-none text-gray-300 sm:size-48 md:size-48 lg:size-1/2 dark:text-gray-500" />
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Header>
        <div className="flex grow gap-2">
          <UserGroupIcon className="size-5" />
          <h2 className="text-base font-normal">My groups</h2>
        </div>
        {groups.length > 0 && (
          <JoinGroupButton
            userId={userId}
            userName={userName}
            userFormattedName={userFormattedName}
            userEmail={userEmail}
            variant="outline"
          />
        )}
      </Header>
      <Container>
        <Panel>
          <h2>Groups</h2>
          {groups.length > 0 ? (
            <UserGroupsTable groupRefs={groups} />
          ) : (
            <div className="flex flex-col items-center">
              <UserGroupIcon className="size-12 text-slate-500 dark:text-gray-300" />
              <p className="p-2 text-sm">Send a request to join a group.</p>
              <JoinGroupButton
                userId={userId}
                userName={userName}
                userFormattedName={userFormattedName}
                userEmail={userEmail}
              />
            </div>
          )}
        </Panel>
        {managedGroups.length > 0 && (
          <Panel>
            <h2>Managed groups</h2>
            <UserManagedGroupsTable groups={managedGroups} />
          </Panel>
        )}
        {requests.length > 0 && (
          <Panel>
            <h2>Pending requests</h2>
            <GroupRequestsTable
              userId={me.id}
              requests={requests}
              isAdmin={false}
            />
          </Panel>
        )}
      </Container>
    </Section>
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
