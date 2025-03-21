import { Page, Panel, Section } from "@/components/layout";
import TextArea from "@/components/textarea";
import { fetchScopePolicies } from "@/services/scope-policies";
import ConfirmButton from "./components/confirm-button";

export default async function Policies() {
  return (
    <Page title="Create Scope Policy">
      <Panel>
        <Section>
          <p className="iam-text-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in
            accumsan leo. Suspendisse potenti. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
            Vestibulum a metus sed ipsum sodales laoreet ac efficitur mi.
            Integer tempus sit amet enim eget consequat. Phasellus sit amet
            fringilla mi, id hendrerit quam.
          </p>
          <TextArea />
          <ConfirmButton />
        </Section>
      </Panel>
    </Page>
  );
}
