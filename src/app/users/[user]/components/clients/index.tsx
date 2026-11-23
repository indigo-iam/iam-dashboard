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
          {clients.length > 0 ? (
            <>
              <ClientsTable clients={clients} isAdmin={isAdmin} />
              <Paginator numberOfPages={numberOfPages} />
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <CubeTransparentIcon className="size-16 text-gray-400" />
              <p>There are no clients associated to this account</p>
              <Link href="/clients/new">
                <Button type="button">Create new client</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </TabPanel>
  );
}
