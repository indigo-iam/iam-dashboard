import { Page, Panel } from "@/components/Layout";
import { fetchScopes } from "@/services/scopes";
import NewScopeButton from "./components/NewScopeButton";
import SearchableTable from "./components/SearchableTable";

type ScopeProps = {
  searchParams?: {
    count?: string;
    page?: string;
  };
};

export default async function Scopes(props: Readonly<ScopeProps>) {
  const scopes = await fetchScopes();
  const { searchParams } = props;
  const count = searchParams?.count ? parseInt(searchParams.count) : 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  return (
    <Page title="Scopes">
      <Panel>
        <NewScopeButton />
        <SearchableTable count={count} page={page} scopes={scopes} />
      </Panel>
    </Page>
  );
}
