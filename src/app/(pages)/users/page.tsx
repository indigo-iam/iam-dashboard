import { Page, Panel, Section } from "@/components/layout";
import { getUsersPage } from "@/services/users";
import { InputQuery } from "@/components/inputs";
import Paginator from "@/components/paginator";
import { AddUserButton, UsersTable } from "./components";

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
          <AddUserButton />
          <InputQuery />
          <UsersTable users={users} />
          <Paginator numberOfPages={numberOfPages} />
        </Section>
      </Panel>
    </Page>
  );
}
