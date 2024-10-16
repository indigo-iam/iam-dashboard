import { Page } from "@/components/Layout";
import ClientForm from "./components/Form";
import { editClient, getClient } from "@/services/clients";
import { auth } from "@/auth";

type ClientPageProps = {
  params: { client: string };
};

export default async function Client(props: Readonly<ClientPageProps>) {
  const { params } = props;
  const clientId = params.client;

  const session = await auth();
  const isAdmin = session?.is_admin ?? false;

  const client = await getClient(clientId, true);
  if (client.error) {
    throw Error(client.error);
  }

  const editAdminClient = async (formData: FormData) => {
    "use server";
    editClient(formData, true);
  };
  return (
    <Page title={client.client_name}>
      <ClientForm
        client={client}
        editClientAction={editAdminClient}
        isAdmin={isAdmin}
      />
    </Page>
  );
}
