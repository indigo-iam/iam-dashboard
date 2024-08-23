import { Form } from "@/components/Form";
import { Page, Panel } from "@/components/Layout";
import { fetchOpenIdConfiguration } from "@/services/openid-configuration";
import { fetchScopes } from "@/services/scopes";
import NewClientCarousel from "./Carousel";

export default async function NewClient() {
  const scopes = await fetchScopes();
  const openIdConfiguration = await fetchOpenIdConfiguration();
  const grantTypes = openIdConfiguration.grant_types_supported;

  return (
    <Page title="Create New Client">
      <Form>
        <Panel>
          <NewClientCarousel systemScopes={scopes} />
        </Panel>
      </Form>
    </Page>
  );
}
