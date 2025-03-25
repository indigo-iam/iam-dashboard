import { Page, Panel } from "@/components/layout";
import { fetchMe } from "@/services/me";
import { GroupsSection, ManagedGroupsSection } from "./components";
import { fetchUser } from "@/services/users";

type GroupsProps = {
  searchParams?: Promise<{
    count?: string;
    page?: string;
    query?: string;
    user?: string;
  }>;
};

async function fetchUserData(userId: string) {
  return userId === "me" ? await fetchMe() : fetchUser(userId);
}

export default async function GroupsPage(props: Readonly<GroupsProps>) {
  const searchParams = await props.searchParams;
  const count = searchParams?.count ? parseInt(searchParams.count) : 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const query = searchParams?.query;
  const userId = searchParams?.user;
  const user = userId ? await fetchUserData(userId) : undefined;

  return (
    <Page title={user ? "User Groups" : "Groups"}>
      <Panel>
        <GroupsSection count={count} page={page} query={query} user={user} />
        <ManagedGroupsSection user={user} />
      </Panel>
    </Page>
  );
}
