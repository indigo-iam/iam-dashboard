import { Page, Panel, Section } from "@/components/Layout";
import { fetchAUP } from "@/services/aup";
import AupView from "./components/AupView";
import CreateButton from "./components/CreateButton";

export default async function AUP() {
  try {
    const aup = await fetchAUP();
    return (
      <Page title="Acceptable Usage Policy">
        <Panel>
          <Section>
            <AupView aup={aup} />
          </Section>
        </Panel>
      </Page>
    );
  } catch (err) {
    return (
      <Page title="Acceptable Usage Policy">
        <Panel>
          <Section>
            <p>AUP is not defined for this organization.</p>
            <CreateButton />
          </Section>
        </Panel>
      </Page>
    );
  }
}
