import { Page, Panel } from "@/components/Layout";
import { fetchAUP } from "@/services/aup";
import AupView from "./components/AupView";
import CreateButton from "./components/CreateButton";

export default async function AUP() {
  try {
    const aup = await fetchAUP();
    return (
      <Page title="Acceptable Usage Policy">
        <Panel>
          <AupView aup={aup} />
        </Panel>
      </Page>
    );
  } catch (err) {
    return (
      <Page title="Acceptable Usage Policy">
        <Panel>
          <p>AUP is not defined for this organization.</p>
          <CreateButton />
        </Panel>
      </Page>
    );
  }
}
