import { Page, Panel, Section } from "@/components/layout";
import { fetchScopePolicies } from "@/services/scope-policies";
import { PoliciesTable } from "./components";

export default async function Policies() {
  const policies = await fetchScopePolicies();
  return (
    <Page title="Scope Policies">
      <Panel>
        <Section>
          <PoliciesTable policies={policies} />
        </Section>
      </Panel>
    </Page>
  );
}
