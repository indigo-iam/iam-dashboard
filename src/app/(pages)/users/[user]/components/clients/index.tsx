// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import ClientsTable from "@/components/clients";
import { Section } from "@/components/layout";
import { TabPanel } from "@/components/tabs";
import { getClientsPage } from "@/services/clients";
import Link from "next/link";

type UseClientsProps = {
  isMe: boolean;
};

export async function UserClients(props: Readonly<UseClientsProps>) {
  const { isMe } = props;
  const clientPage = await getClientsPage(100, 1, isMe);
  const clients = clientPage.Resources;
  return (
    <TabPanel>
      <Section title="Owned Clients">
        <div className="flex flex-col gap-4">
          <Link href="/clients/new">
            <Button className="btn-secondary">New Client</Button>
          </Link>
          <ClientsTable clients={clients} />
        </div>
      </Section>
    </TabPanel>
  );
}
