import { Page, Panel, Section } from "@/components/layout";
import { fetchScopePolicy } from "@/services/scope-policies";
import Editor from "./components/editor";

type PolicyPageProps = {
  params: Promise<{ policy: number }>;
};

export default async function PolicyPage(props: Readonly<PolicyPageProps>) {
  const { params } = props;
  const id = (await params).policy;
  const policy = await fetchScopePolicy(id);
  return (
    <Page title="Edit Scope Policy">
      <Panel>
        <Section title={policy.description}>
          <Editor policy={policy} />
        </Section>
      </Panel>
    </Page>
  );
}
