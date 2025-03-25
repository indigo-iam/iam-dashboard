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
    <li className="flex flex-row rounded border-b p-2 last:border-b-0 hover:border-transparent hover:bg-neutral-200 has-[+:hover]:border-transparent dark:hover:bg-neutral-200/10">
      <div className="flex grow flex-col">
        <div className="flex flex-col sm:flex-row">
          <Link
            className="my-auto flex flex-col gap-1"
            href={`/clients/${client_id}`}
          >
            <div className="flex flex-col hover:underline">
              <div className="font-bold">{client_name}</div>
              <small>{client_id}</small>
            </div>
            <div
              title={scopes}
              className="iam-text-light line-clamp-1 p-1 text-xs"
            >
              {scopes}
            </div>
          </Link>
          <div className="my-auto flex grow flex-col">
            <div className="inline-flex gap-2 sm:flex-col sm:items-end sm:gap-0 sm:px-2">
              <Status active={client.active} />
              <small className="iam-text-light min-w-48 sm:text-right">
                Created {createdAt}
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <ClientOptions client={client} />
      </div>
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
