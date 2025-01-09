import { Page, Panel } from "@/components/layout";
import ClientForm from "./components/form";
import { editClient, getClient } from "@/services/clients";
import { auth } from "@/auth";

type ClientPageProps = {
  params: Promise<{ client: string }>;
};

export default async function Client(props: Readonly<ClientPageProps>) {
  const { params } = props;
  const clientId = (await params).client;

  const session = await auth();
  const isAdmin = session?.is_admin ?? false;

  const client = await getClient(clientId, true);
  if (client.error) {
    throw Error(client.error);
  }

  const editAdminClient = async (formData: FormData) => {
    "use server";
    await editClient(formData, true);
  };
  return (
    <Page title={client.client_name}>
      <Panel>
        <ClientForm
          client={client}
          editClientAction={editAdminClient}
          isAdmin={isAdmin}
        />
      </Panel>
    </Page>
  );
}
