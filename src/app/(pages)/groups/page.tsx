// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Page, Panel, Section } from "@/components/layout";
import { getGroupsPage } from "@/services/groups";
import { AddGroupButton, GroupsTable } from "./components";
import { InputQuery } from "@/components/inputs";
import Paginator from "@/components/paginator";

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
    <Page title="Groups">
      <Panel>
        <Section>
          <AddGroupButton />
          <InputQuery data-test="search-group" />
          <GroupsTable groups={groups} />
          <Paginator numberOfPages={numberOfPages} />
        </Section>
      </Panel>
    </Page>
  );
}
