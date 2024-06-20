import { Client } from "@/models/client";
import Button from "@/components/Button";
import Link from "next/link";
import { getClientsPage } from "@/services/clients";
import React from "react";

type RowProps = {
  client: Client;
  deleteClient?: (client: Client) => void;
};

function Row(props: Readonly<RowProps>) {
  const { client_id, client_name } = props.client;

  const action = async () => {
    "use server";
    console.log(`$(fake) delete client with id '${client_id}'`);
  };

  return (
    <tr key={client_id}>
      <td>{client_name}</td>
      <td>
        <Link
          href={`/clients/${client_id}`}
          className="text-primary-600 underline"
        >
          {client_id}
        </Link>
      </td>
      <td>
        <form action={action}>
          <Button action="danger" type="submit">
            Delete
          </Button>
        </form>
      </td>
    </tr>
  );
}

type ClientsTableProps = {
  page: number;
  elementsPerPage: number;
  children?: React.ReactNode;
};

export default async function ClientsTable(props: Readonly<ClientsTableProps>) {
  const { page, elementsPerPage, children } = props;
  const clientsPage = await getClientsPage(elementsPerPage, page);
  const clients = clientsPage.Resources;

  return (
    <div className="w-full rounded-xl border bg-secondary p-2 shadow-xl space-y-4">
      <table className="w-full table-auto border-0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Client Id</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <Row key={client.client_id} client={client} />
          ))}
        </tbody>
      </table>
      {children}
    </div>
  );
}
