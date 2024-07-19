import Page from "@/components/Page";
import { editClient, getClient } from "@/services/clients";
import ClientForm from "@/components/ClientForm";

type ClientPageProps = {
  params: { client: string };
};

export default async function Client(props: Readonly<ClientPageProps>) {
  const { params } = props;
  const clientId = params.client;

  const client = await getClient(clientId, false);
  if (client.error) {
    throw Error(client.error);
  }

  return (
    <Page title={client.client_name}>
      <ClientForm
        client={client}
        editClientAction={editClient}
        isAdmin={false}
      />
    </Page>
  );
}
