// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession, isUserAdmin } from "@/auth";
import { TabGroup, TabList, TabPanels, Tab } from "@/components/tabs";
import { getClient } from "@/services/clients";
import {
  Main,
  Credentials,
  Scopes,
  GrantTypes,
  Tokens,
  Owners,
} from "./components";

import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";

type ClientPageProps = {
  params: Promise<{ client: string }>;
};

export default async function Client(props: Readonly<ClientPageProps>) {
  const { params } = props;
  const clientId = (await params).client;
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const { hasRoleAdmin } = session.session;
  const isAdmin = await isUserAdmin();

  const client = await getClient(clientId, hasRoleAdmin && isAdmin);
  if (client.error) {
    throw Error(client.error);
  }

  return (
    <section>
      <header className="section-header">
        <RocketLaunchIcon className="size-5" />
        <h2 className="text-base font-normal">{client.client_name}</h2>
      </header>
      <TabGroup className="content">
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
    </section>
  );
}
