import { Page, Panel, Section } from "@/components/Layout";
import { fetchPaginatedScopes } from "@/services/scopes";
import NewScopeButton from "./components/NewScopeButton";
import ScopesTable from "./components/Table";
import Paginator from "@/components/Paginator";
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
        <Section>
          <NewScopeButton />
          <SearchField />
          <div className="overflow-y-visible">
            <ScopesTable scopes={scopes.Resources} />
          </div>
          <Paginator numberOfPages={numberOfPages} />
        </Section>
      </Panel>
    </Page>
  );
}
