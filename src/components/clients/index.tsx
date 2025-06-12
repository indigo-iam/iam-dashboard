// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Client } from "@/models/client";
import Link from "next/link";
import ClientOptions from "./options";
import { dateToHuman } from "@/utils/dates";
import { Status } from "../badges";

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
        <div className="flex grow flex-col lg:flex-row">
          <Link
            className="flex grow flex-col gap-1 break-all"
            href={`/clients/${client_id}`}
          >
            <div className="flex flex-col hover:underline">
              <div className="font-bold">{client_name}</div>
              <small className="dark:text-extralight">{client_id}</small>
            </div>
            <div
              title={scopes}
              className="dark:text-secondary line-clamp-1 text-xs font-light"
            >
              {scopes}
            </div>
          </Link>
          <div className="flex flex-row gap-2 py-1 lg:flex-col lg:items-end lg:justify-center">
            <Status active={client.active} />
            <small className="dark:text-extralight font-light sm:text-right">
              Created {createdAt}
            </small>
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

export default function ClientsTable(props: Readonly<ClientsTableProps>) {
  const { clients } = props;
  return (
    <ul className="w-full">
      {clients.map(client => (
        <Row key={client.client_id} client={client} />
      ))}
    </ul>
  );
}
