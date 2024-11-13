import { Page, Panel } from "@/components/Layout";
import { fetchPaginatedScopes } from "@/services/scopes";
import NewScopeButton from "./components/NewScopeButton";
import ScopesTable from "./components/Table";
import { Paginator } from "@/components/Table";
import SearchField from "./components/SearchField";

type ScopeProps = {
  searchParams?: {
    count?: string;
    page?: string;
    filter?: string;
  };
};

export default async function Scopes(props: Readonly<ScopeProps>) {
  const { searchParams } = props;
  const count = searchParams?.count ? parseInt(searchParams.count) : 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const filter = searchParams?.filter;
  const startIndex = count * (page - 1);
  const scopes = await fetchPaginatedScopes(count, startIndex, filter);
  const numberOfPages = Math.ceil(scopes.totalResults / count);

  return (
    <Page title="Scopes">
      <Panel>
        <NewScopeButton />
        <SearchField />
        <ScopesTable scopes={scopes.Resources} />
        <Paginator numberOfPages={numberOfPages} />
      </Panel>
    </Page>
  );
}
