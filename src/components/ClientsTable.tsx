import Paginator from "@/components/Paginator";
import { getClientsPage } from "@/services/clients";
import { Client } from "@/models/client";
import { Paginated } from "@/models/pagination";
import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

type RowProps = {
  client: Client;
  baseUrl: string;
  deleteClient?: (clientId: string) => void;
};

function Row(props: Readonly<RowProps>) {
  const { client, baseUrl, deleteClient } = props;
  const { client_id, client_name } = client;

  const action = async () => {
    "use server";
    deleteClient?.(client_id);
  };

  return (
    <tr key={client_id} className="text-sm">
      <td>{client_name}</td>
      <td>
        <Link
          href={`${baseUrl}/${client_id}`}
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
  isAdmin: boolean;
  children?: React.ReactNode;
};

function Table(props: Readonly<TableProps>) {
  const { clients, children, isAdmin } = props;
  const baseUrl = isAdmin ? "/clients" : "/me/clients";
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
            <Row key={client.client_id} client={client} baseUrl={baseUrl} />
          ))}
        </tbody>
      </table>
      {children}
    </div>
  );
}

type ClientsTableProps = { count?: string; page?: string; isAdmin: boolean };

export default async function ClientsTable(props: Readonly<ClientsTableProps>) {
  const { count, page, isAdmin } = props;
  let itemsPerPage = 10;
  let currentPage = 0;

  itemsPerPage = count ? parseInt(count) || itemsPerPage : itemsPerPage;
  currentPage = page ? parseInt(page) - 1 || currentPage : currentPage;

  const startIndex = currentPage * itemsPerPage + 1;

  let response: Paginated<Client>;
  let numberOfPages = 0;

  try {
    response = await getClientsPage(itemsPerPage, startIndex, isAdmin);
    const { totalResults } = response;
    numberOfPages = Math.ceil(totalResults / itemsPerPage);
  } catch (err) {
    console.error(err);
    return <h1>{`${err}`}</h1>;
  }

  return (
    <Table clients={response.Resources} isAdmin={isAdmin}>
      <Paginator numberOfPages={numberOfPages} />
    </Table>
  );
}
