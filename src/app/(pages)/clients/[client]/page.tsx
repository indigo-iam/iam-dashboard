import { TabGroup, TabList, TabPanels } from "@headlessui/react";
import Tab from "@/components/Tabs/Tab";
import Page from "@/components/Page";
import { getClient } from "@/services/clients";
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

type ClientPageProps = {
  params: { client: string };
};

export default async function Client(props: Readonly<ClientPageProps>) {
  const { params } = props;
  const clientId = params.client;

  const client = await getClient(clientId);

  if (client.error) {
    throw Error(client.error);
  }

  return (
    <Page title={client.client_name}>
      <TabGroup className="w-full p-2">
        <TabList className="flex">
          <Tab>Main</Tab>
          <Tab>Credentials</Tab>
          <Tab>Scopes</Tab>
          <Tab>Grant Types</Tab>
          <Tab>Scopes</Tab>
          <Tab>Crypto</Tab>
          <Tab>Other Info</Tab>
          <Tab>Owners</Tab>
        </TabList>
        <TabPanels>
          <Main
            client_id={client.client_id}
            client_name={client.client_name}
            client_description={client.client_description}
            redirect_uris={client.redirect_uris}
            dynamically_registered={client.dynamically_registered}
            contacts={client.contacts}
          />
          <Credentials />
          <Scopes scope={client.scope} />
          <GrantTypes grant_types={client.grant_types} />
          <Tokens />
          <Crypto />
          <OtherInfo />
          <Owners />
        </TabPanels>
      </TabGroup>
    </Page>
  );
}
