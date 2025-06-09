// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabGroup, TabList, TabPanels, Tab } from "@/components/tabs";
import { Page, Panel } from "@/components/layout";
import { getClient } from "@/services/clients";
import {
  Main,
  Credentials,
  Scopes,
  GrantTypes,
  Tokens,
  Owners,
} from "./components";
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

  return (
    <Page title={client.client_name}>
      <Panel>
        <TabGroup className="space-y-8">
          <TabList className="flex overflow-auto">
            <Tab>GENERAL</Tab>
            <Tab>CREDENTIALS</Tab>
            <Tab>SCOPES</Tab>
            <Tab>GRANT TYPES</Tab>
            <Tab>TOKENS</Tab>
            {isAdmin ? <Tab>OWNERS</Tab> : null}
          </TabList>
          <TabPanels>
            <Main client={client} />
            <Credentials client={client} />
            <Scopes client={client} />
            <GrantTypes client={client} />
            <Tokens client={client} />
            {isAdmin ? <Owners client={client} /> : null}
          </TabPanels>
        </TabGroup>
      </Panel>
    </Page>
  );
}
