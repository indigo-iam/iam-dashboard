// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "next/link";
import { CubeTransparentIcon } from "@heroicons/react/24/solid";

import { ClientsTable } from "@/app/components/clients";
import { Button } from "@/components/buttons";
import Paginator from "@/components/paginator";
import { TabPanel } from "@/components/tabs";
import { getClientsByAccount } from "@/services/clients";

type UseClientsProps = {
  userId: string;
  isAdmin: boolean;
  count?: string;
  page?: string;
};

export async function UserClients(props: Readonly<UseClientsProps>) {
  const { userId, isAdmin } = props;
  const count = props.count ? Number.parseInt(props.count) : 10;
  const page = props.page ? Number.parseInt(props.page) : 1;
  const startIndex = 1 + count * (page - 1);
  const clientPage = await getClientsByAccount(userId, count, startIndex);
  const numberOfPages =
    Math.ceil(clientPage.totalResults / clientPage.itemsPerPage) || 1;
  const clients = clientPage.Resources;
  if (clients.length === 0) {
    return (
      <TabPanel variant="plain">
        <div className="mt-16 flex items-center justify-between">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2>Create a new client</h2>
              <p className="text-gray-500">
                Create a client to register an application and manage how it
                authenticates.
              </p>
            </div>
            <Link href="/clients/new">
              <Button type="button">Create new client</Button>
            </Link>
          </div>
          <CubeTransparentIcon className="size-2/4 text-gray-300 dark:text-gray-500" />
        </div>
      </TabPanel>
    );
  }

  return (
    <TabPanel>
      <div className="panel space-y-4">
        <h2 className="flex items-center justify-between">
          Clients
          {clients.length > 0 && (
            <Link href="/clients/new">
              <Button variant="outline" type="button">
                Create new client
              </Button>
            </Link>
          )}
        </h2>
        <div className="flex flex-col gap-4">
          <ClientsTable clients={clients} isAdmin={isAdmin} />
          <Paginator numberOfPages={numberOfPages} />
        </div>
      </div>
    </TabPanel>
  );
}
