import Paginator from "@/components/Paginator";
import { getClientsPage } from "@/services/clients";
import { getClientsPage as getMeClientsPage } from "@/services/me";
import { Client } from "@/models/client";
import Button from "@/components/Button";
import Link from "next/link";
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
    <tr key={client_id} className="text-sm">
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

type TableProps = {
  clients: Client[];
  children?: React.ReactNode;
};

function Table(props: Readonly<TableProps>) {
  const { clients, children } = props;
  return (
    <div className="w-full space-y-4 rounded-xl border bg-secondary p-2 shadow-xl">
      <table className="w-full table-auto border-0">
        <thead>
          <tr className="hover:bg-secondary">
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

type ClientsTableProps = { count?: string; page?: string; me?: boolean };

export default async function ClientsTable(props: Readonly<ClientsTableProps>) {
  const { count, page, me } = props;
  const itemsPerPage = count ? parseInt(count) : 10;
  const currentPage = page ? parseInt(page) - 1 : 0;
  const startIndex = currentPage * itemsPerPage + 1;
  const response = me
    ? await getMeClientsPage(itemsPerPage, startIndex)
    : await getClientsPage(itemsPerPage, startIndex);
  const { totalResults } = response;
  const numberOfPages = Math.ceil(totalResults / itemsPerPage);
  return (
    <Table clients={response.Resources}>
      <Paginator numberOfPages={numberOfPages} />
    </Table>
  );
}
