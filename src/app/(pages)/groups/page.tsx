import { Page, Panel, Section } from "@/components/layout";
import Paginator from "@/components/paginator";
import { getGroupsPage, getMyGroupsPage } from "@/services/groups";
import { fetchMe } from "@/services/me";
import { InputQuery } from "@/components/inputs";
import { AddGroupButton, GroupsTable, JoinGroupButton } from "./components";
import { auth } from "@/auth";
import { Suspense } from "react";

type GroupsProps = {
  searchParams?: Promise<{
    count?: string;
    page?: string;
    query?: string;
    me?: string;
  }>;
};

async function getMyGroupsPageWrap(
  count: number,
  startIndex?: number,
  query?: string
) {
  const me = await fetchMe();
  return (await getMyGroupsPage(me, count, startIndex, query))
}

export default async function GroupsPage(props: Readonly<GroupsProps>) {
  const searchParams = await props.searchParams;
  const isMe = searchParams?.hasOwnProperty("me") ?? false;
  const count = searchParams?.count ? parseInt(searchParams.count) : 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const query = searchParams?.query;
  const startIndex = 1 + count * (page - 1);
  const groupsPage = isMe ? await getMyGroupsPageWrap(count, startIndex, query)
    : await getGroupsPage(count, startIndex, query);
  const numberOfPages = Math.ceil(groupsPage.totalResults / count) || 1;
  const me = isMe ? await fetchMe() : undefined;
  const session = isMe ? await auth() : undefined;
  const isAdmin = session?.is_admin ?? false;
  const groups = groupsPage.Resources;
  
  return (
    <Page title={isMe ? "My Groups" : "Groups"}>
      <Panel>
        <Section>
          {me ? (
            <JoinGroupButton user={me} isAdmin={isAdmin} />
          ) : (
            <AddGroupButton />
          )}
          <InputQuery />
          <Suspense fallback="Loading...">
            <GroupsTable groups={groups} user={me} />
          </Suspense>
          <Paginator numberOfPages={numberOfPages} />
        </Section>
        {/* Panel ManagedGroups */}
      </Panel>
    </Page>
  );
}
