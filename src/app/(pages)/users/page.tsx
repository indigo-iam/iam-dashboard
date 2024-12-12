import { Page, Panel, Section } from "@/components/Layout";
import { getUsersPage } from "@/services/users";
import Paginator from "@/components/Paginator";
import UsersTable from "./components/UsersTable";
import AddUser from "./components/AddUser";
import InputQuery from "@/components/Inputs/InputQuery";

type UsersProps = {
  searchParams?: Promise<{
    count?: string;
    page?: string;
    query?: string;
  }>;
};

export default async function UsersPage(props: Readonly<UsersProps>) {
  const searchParams = await props.searchParams;
  const count = searchParams?.count ? parseInt(searchParams.count) : 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const query = searchParams?.query;
  const startIndex = 1 + count * (page - 1);
  const usersPage = await getUsersPage(count, startIndex, query);
  const numberOfPages = Math.ceil(usersPage.totalResults / count);
  const users = usersPage.Resources;
  return (
    <Page title="Users">
      <Panel>
        <Section>
          <AddUser />
          <InputQuery />
          <UsersTable users={users} />
          <Paginator numberOfPages={numberOfPages} />
        </Section>
      </Panel>
    </Page>
  );
}
