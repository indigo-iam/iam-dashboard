import { Page, Panel, Section } from "@/components/layout";
import Paginator from "@/components/paginator";
import { getGroupsPage } from "@/services/groups";
import { InputQuery } from "@/components/inputs";
import { AddGroupButton, GroupsTable } from "./components";
import { Suspense } from "react";

type GroupsProps = {
  searchParams?: Promise<{
    count?: string;
    page?: string;
    query?: string;
    me?: string;
  }>;
};

export default async function GroupsPage(props: Readonly<GroupsProps>) {
  const searchParams = await props.searchParams;
  const isMe = searchParams?.hasOwnProperty("me");
  const count = searchParams?.count ? parseInt(searchParams.count) : 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const query = searchParams?.query;
  const startIndex = 1 + count * (page - 1);
  const groupsPage = await getGroupsPage(count, startIndex, isMe, query);
  const numberOfPages = Math.ceil(groupsPage.totalResults / count) || 1;
  const groups = groupsPage.Resources;
  return (
    <Page title={isMe ? "My Groups" : "Groups"}>
      <Panel>
        <Section>
          {/* isMe && Button to join group? */}
          <AddGroupButton />
          <InputQuery />
          <Suspense fallback="Loading...">
            <GroupsTable groups={groups} />
          </Suspense>
          <Paginator numberOfPages={numberOfPages} />
        </Section>
      </Panel>
    </Page>
  );
}
