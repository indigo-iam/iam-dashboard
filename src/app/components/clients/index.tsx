// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "next/link";
import { Status } from "@/components/badges";
import { Client } from "@/models/client";
import ClientOptions from "./options";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function sortScopes(scope: String) {
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
  const { client_id, client_name, scope } = client;
  const scopes = scope ? sortScopes(scope) : undefined;
  const createdAt = client.created_at
    ? new Date(client.created_at).toLocaleString()
    : "N/A";
  return (
    <li className="iam-list-item flex flex-row lg:gap-2">
      <div className="flex w-0 grow flex-col space-y-2 lg:flex-row lg:space-y-0">
        <Link
          className="flex grow flex-col lg:w-0"
          href={`/clients/${client_id}`}
        >
          <p className="text-gray-950 dark:text-gray-100">{client_name}</p>
          <div className="flex flex-col">
            <p className="truncate text-sm font-light">
              {client.client_description}
            </p>
            <p title={scopes} className="truncate text-sm font-light">
              {scopes}
            </p>
          </div>
        </Link>
        <div className="flex flex-row items-center gap-1.5 lg:flex-col lg:items-end lg:justify-center">
          <Status active={client.active} autoHide={true} />
          <p className="text-xs font-light whitespace-nowrap sm:text-right">
            Created {createdAt}
          </p>
        </div>
      </div>
      <ClientOptions client={client} isAdmin={isAdmin} />
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
