// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { auth } from "@/auth";
import { cookies } from "next/headers";
import { Layout } from "@/app/components/layout";
import { TabGroup, TabList, TabPanels, Tab } from "@/components/tabs";
import { getClient, getClientOwners } from "@/services/clients";
import {
  Main,
  Credentials,
  Scopes,
  GrantTypes,
  Tokens,
  Owners,
} from "./components";

type ClientPageProps = {
  params: Promise<{ client: string }>;
};

export default async function Client(props: Readonly<ClientPageProps>) {
  const { params } = props;
  const clientId = (await params).client;
  const session = await auth();
  const userId = session?.user?.id;
  const isAdmin = session?.is_admin ?? false;
  const cookiesStore = await cookies();
  const adminMode = cookiesStore.get("admin-mode")?.value === "enabled";

  if (isAdmin && !adminMode) {
    const owners = await getClientOwners(clientId);
    const found = owners.findIndex(owner => owner.id === userId);
    if (found === -1) {
      return (
        <Layout title="Not authorized">
          <h2>You are not authorized to view this page.</h2>
        </Layout>
      );
    }
  }

  const client = await getClient(clientId, isAdmin);
  if (client.error) {
    throw Error(client.error);
  }

  return (
    <Layout title={client.client_name}>
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
    </Layout>
  );
}
