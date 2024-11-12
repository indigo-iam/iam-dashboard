import { Page, Panel } from "@/components/Layout";
import { fetchScopes } from "@/services/scopes";
import ScopesTable from "./components/Table";
import NewScopeButton from "./components/NewScopeButton";

export default async function Scopes() {
  const scopes = await fetchScopes();
  return (
    <Page title="Scopes">
      <Panel>
        <NewScopeButton />
        <ScopesTable scopes={scopes} />
      </Panel>
    </Page>
  );
}
