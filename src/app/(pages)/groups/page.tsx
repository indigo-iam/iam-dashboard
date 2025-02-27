import { Page, Panel } from "@/components/layout";
import { fetchMe } from "@/services/me";
import {
  GroupsSection,
  ManagedGroupsSection
} from "./components";

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
  const me = isMe ? await fetchMe() : undefined;
  
  return (
    <Page title={isMe ? "My Groups" : "Groups"}>
      <Panel>
        <GroupsSection
          count={count}
          page={page}
          query={query}
          me={me}
        />
        <ManagedGroupsSection me={me} />
      </Panel>
    </Page>
  );
}
