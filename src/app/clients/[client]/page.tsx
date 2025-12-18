// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession } from "@/auth/server";
import { Layout } from "@/app/components/layout";
import { TabGroup, TabList, TabPanels, Tab } from "@/components/tabs";
import { getClient } from "@/services/clients";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
  const session = await getSession();
  if (!session) {
    redirect("/");
  }
  const { user } = session;

  const cookiesStore = await cookies();
  const adminMode = cookiesStore.get("admin-mode")?.value === "enabled";

  const client = await getClient(clientId, user.isAdmin && adminMode);
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
          {user.isAdmin ? <Tab>OWNERS</Tab> : null}
        </TabList>
        <TabPanels>
          <Main client={client} />
          <Credentials client={client} />
          <Scopes client={client} />
          <GrantTypes client={client} />
          <Tokens client={client} />
          {user.isAdmin ? <Owners client={client} /> : null}
        </TabPanels>
      </TabGroup>
    </Layout>
  );
}
