// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Link from "@/components/link";
import { Status } from "@/components/badges";
import { Client } from "@/models/client";
import { dateToHuman } from "@/utils/dates";
import ClientOptions from "./options";

function sortScopes(scope: string) {
  const scopes = scope.split(" ");
  scopes.sort((a, b) => a.localeCompare(b));
  return scopes.join(" ");
}

type RowProps = {
  client: Client;
  isAdmin: boolean;
};

function Row(props: Readonly<RowProps>) {
  const { client, isAdmin } = props;
  const scopes = client.scope ? sortScopes(client.scope) : undefined;
  const lastUsed = client.last_used
    ? `Last used ${dateToHuman(new Date(client.last_used))}`
    : "Never used";
  return (
    <li className="iam-list-item gap-2">
      <div className="flex w-0 grow flex-col space-y-2 lg:flex-row lg:gap-16 lg:space-y-0">
        <div className="flex grow flex-col lg:w-0">
          <Link className="iam-link" href={`/clients/${client.client_id}`}>
            {client.client_name}
          </Link>
          <div className="flex flex-col">
            {client.client_description && (
              <p className="truncate text-sm font-light">
                {client.client_description}
              </p>
            )}

            <div className="flex flex-col text-xs font-extralight">
              <div className="flex items-center gap-1">
                <div className="lg:hidden">
                  <Status active={client.active} autoHide={true} />
                </div>
                <span className="whitespace-nowrap">{lastUsed}</span>
                <span>•</span>
                <span title={scopes} className="truncate">
                  {scopes}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden items-center lg:flex lg:flex-col lg:items-end lg:justify-center">
          <Status active={client.active} autoHide={true} />
        </div>
      </div>
      <ClientOptions
        isAdmin={isAdmin}
        clientId={client.client_id}
        clientName={client.client_name}
        clientDescription={client.client_description}
        active={client.active}
      />
    </li>
  );
}

type ClientsTableProps = {
  clients: Client[];
  isAdmin: boolean;
};

export function ClientsTable(props: Readonly<ClientsTableProps>) {
  const { clients, isAdmin } = props;
  if (clients.length === 0) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <MagnifyingGlassIcon className="size-16 text-gray-400 dark:text-white/60" />
        <span>No client found.</span>
      </div>
    );
  }
  return (
    <ul className="w-full">
      {clients.map(client => (
        <Row key={client.client_id} client={client} isAdmin={isAdmin} />
      ))}
    </ul>
  );
}
