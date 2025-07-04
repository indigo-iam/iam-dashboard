// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "next/link";
import { Status } from "@/components/badges";
import { Client } from "@/models/client";
import { dateToHuman } from "@/utils/dates";
import ClientOptions from "./options";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type RowProps = {
  client: Client;
};

function sortScopes(scope: String) {
  const scopes = scope.split(" ");
  scopes.sort((a, b) => a.localeCompare(b));
  return scopes.join(" ");
}

function Row(props: Readonly<RowProps>) {
  const { client } = props;
  const { client_id, client_name, scope } = client;
  const scopes = scope ? sortScopes(scope) : undefined;
  const createdAt = client.created_at
    ? dateToHuman(new Date(client.created_at))
    : "N/A";
  return (
    <li className="iam-list-item flex flex-row gap-2">
      <div className="flex grow">
        <div className="flex grow flex-col space-y-2 lg:flex-row">
          <Link
            className="flex grow flex-col gap-0.5 break-all hover:underline"
            href={`/clients/${client_id}`}
          >
            {client_name}
            <div className="flex flex-col">
              <p className="text-gray dark:text-secondary/70 text-sm">
                {client_id}
              </p>
              <p
                title={scopes}
                className="text-gray dark:text-secondary/60 line-clamp-1 text-sm"
              >
                {scopes}
              </p>
            </div>
          </Link>
          <div className="flex flex-row items-center gap-2 lg:flex-col lg:items-end lg:justify-center">
            <Status active={client.active} />
            <p className="text-gray dark:text-secondary/50 text-sm whitespace-nowrap sm:text-right">
              Created {createdAt}
            </p>
          </div>
        </div>
      </div>
      <ClientOptions client={client} />
    </li>
  );
}

type ClientsTableProps = {
  clients: Client[];
};

export function ClientsTable(props: Readonly<ClientsTableProps>) {
  const { clients } = props;
  if (clients.length === 0) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <MagnifyingGlassIcon className="text-primary/60 size-16 dark:text-white/60" />
        <span>No client found.</span>
      </div>
    );
  }
  return (
    <ul className="w-full">
      {clients.map(client => (
        <Row key={client.client_id} client={client} />
      ))}
    </ul>
  );
}
