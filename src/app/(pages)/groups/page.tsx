import { Page, Panel, Section } from "@/components/Layout";
import AddGroupButton from "./components/AddGroupButton";
import GroupsTable from "./components/GroupsTable";
import Paginator from "@/components/Paginator";
import { getGroupsPage } from "@/services/groups";
import InputQuery from "@/components/Inputs/InputQuery";

type GroupsProps = {
  searchParams?: {
    count?: string;
    page?: string;
    query?: string;
  };
};

export default async function GroupsPage(props: Readonly<GroupsProps>) {
  const { searchParams } = props;
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
          <InputQuery />
          <GroupsTable groups={groups} />
          <Paginator numberOfPages={numberOfPages} />
        </Section>
      </Panel>
    </Page>
  );
}
