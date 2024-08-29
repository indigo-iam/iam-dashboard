import { Form } from "@/components/Form";
import { Page, Panel } from "@/components/Layout";
import { fetchOpenIdConfiguration } from "@/services/openid-configuration";
import { fetchScopes } from "@/services/scopes";
import NewClientCarousel from "./Carousel";

export default async function NewClient() {
  const scopes = await fetchScopes();
  const openIdConfiguration = await fetchOpenIdConfiguration();
  
  const action = async (formData: FormData) => {
    "use server";
    console.log(formData);
  };

  return (
    <Page title="Create New Client">
      <Form action={action}>
        <Panel>
          <NewClientCarousel
            systemScopes={scopes}
            openIdConfiguration={openIdConfiguration}
          />
        </Panel>
      </Form>
    </Page>
  );
}
