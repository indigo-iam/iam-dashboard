// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ClientsTable } from "@/app/components/clients";
import Paginator from "@/components/paginator";
import { TabPanel } from "@/components/tabs";
import { User } from "@/models/scim";
import { getClientsByAccount } from "@/services/clients";
import Link from "next/link";

type UseClientsProps = {
  user: User;
  count?: string;
  page?: string;
};

export async function UserClients(props: Readonly<UseClientsProps>) {
  const { user } = props;
  const count = props.count ? parseInt(props.count) : 10;
  const page = props.page ? parseInt(props.page) : 1;
  const startIndex = 1 + count * (page - 1);
  const clientPage = await getClientsByAccount(user.id, count, startIndex);
  const numberOfPages = Math.ceil(clientPage.totalResults / count) || 1;

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
          <Paginator numberOfPages={numberOfPages} />
        </div>
      </div>
    </TabPanel>
  );
}
