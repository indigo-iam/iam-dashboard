// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ClientsTable } from "@/app/components/clients";
import { TabPanel } from "@/components/tabs";
import { User } from "@/models/scim";
import { getClientsPage } from "@/services/clients";
import Link from "next/link";

type UseClientsProps = {
  user: User;
};

export async function UserClients(props: Readonly<UseClientsProps>) {
  const { user } = props;
  // const clientPage = await getClientsByAccount(user.id, 100, 1);
  const clientPage = await getClientsPage(100, 1, false);

  const clients = clientPage.Resources;
  return (
    <TabPanel className="space-y-4">
      <Link className="btn-secondary max-w-fit" href="/clients/new">
        New Client
      </Link>
      <div className="panel space-y-4">
        <h2>Owned Clients</h2>
        <div className="flex flex-col gap-4">
          <ClientsTable clients={clients} />
        </div>
      </div>
    </TabPanel>
  );
}
