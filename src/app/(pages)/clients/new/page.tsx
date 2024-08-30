import { Form } from "@/components/Form";
import { Page, Panel } from "@/components/Layout";
import { fetchOpenIdConfiguration } from "@/services/openid-configuration";
import { fetchScopes } from "@/services/scopes";
import { NewClientForm } from "./Form";
import { registerClient } from "@/services/clients";
import { ClientRequest } from "@/models/client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function NewClient() {
  const scopes = await fetchScopes();
  const openIdConfiguration = await fetchOpenIdConfiguration();
  const session = await auth();

  const action = async (formData: FormData) => {
    "use server";

    const request: ClientRequest = {
      redirect_uris: formData.getAll("redirect_uris") as string[],
      client_name: formData.get("client_name") as string,
      client_description: (formData.get("client_description") as string) ?? "",
      contacts: formData.getAll("contacts") as string[],
      token_endpoint_auth_method: formData.get(
        "token_endpoint_auth_method[id]"
      ) as string,
      scope: "",
      grant_types: [formData.get("grant_types[id]") as string],
    };

    const scopes: string[] = [];
    const it = formData.keys();
    let result = it.next();
    while (!result.done) {
      const key = result.value;
      if (key.startsWith("scope") && key.includes("[name]")) {
        scopes.push(formData.get(key) as string);
      }
      result = it.next();
    }

    request.scope = scopes.join(" ");
    const client_uri = formData.get("client_uri") as string | undefined;
    const tos_uri = formData.get("tos_uri") as string | undefined;
    const policy_uri = formData.get("policy_uri") as string | undefined;

    if (client_uri) {
      request.client_uri = client_uri;
    }

    if (tos_uri) {
      request.tos_uri = tos_uri;
    }

    if (policy_uri) {
      request.policy_uri = policy_uri;
    }
    await registerClient(request);
    session?.is_admin ? redirect("/clients") : redirect("/me/clients");
  };

  return (
    <Page title="Create New Client">
      <Form action={action}>
        <Panel>
          <NewClientForm
            systemScopes={scopes}
            openIdConfiguration={openIdConfiguration}
          />
        </Panel>
      </Form>
    </Page>
  );
}
