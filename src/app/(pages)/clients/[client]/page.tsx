import { TabGroup, TabList, TabPanels } from "@headlessui/react";
import Tab from "@/components/Tabs/Tab";
import Page from "@/components/Page";
import { editClient, getClient } from "@/services/clients";
import {
  Main,
  Credentials,
  Crypto,
  Scopes,
  GrantTypes,
  Tokens,
  OtherInfo,
  Owners,
} from "./components/tabs";
import FormButtons from "./components/tabs/form-buttons";
import { Form } from "@/components/Form";
import { auth } from "@/auth";

type ClientPageProps = {
  params: { client: string };
};

export default async function Client(props: Readonly<ClientPageProps>) {
  const session = await auth();
  const { params } = props;
  const clientId = params.client;

  const client = await getClient(clientId);
  if (client.error) {
    throw Error(client.error);
  }

  return (
    <Page title={client.client_name}>
      <Form action={editClient}>
        <TabGroup className="w-full p-2">
          <TabList className="flex">
            <Tab>Main</Tab>
            <Tab>Credentials</Tab>
            <Tab>Scopes</Tab>
            <Tab>Grant Types</Tab>
            <Tab>Tokens</Tab>
            <Tab>Crypto</Tab>
            <Tab>Other Info</Tab>
            {session?.is_admin ? <Tab>Owners</Tab> : null}
          </TabList>
          <TabPanels>
            <Main {...client} />
            <Credentials {...client} />
            <Scopes {...client} />
            <GrantTypes {...client} />
            <Tokens {...client} />
            <Crypto {...client} />
            <OtherInfo {...client} />
            {session?.is_admin ? <Owners {...client} /> : null}
          </TabPanels>
        </TabGroup>
        <FormButtons />
      </Form>
    </Page>
  );
}
