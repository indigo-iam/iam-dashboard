import Paginator from "@/components/Paginator";
import { getClientsPage } from "@/services/clients";
import { Client } from "@/models/client";
import { Paginated } from "@/models/pagination";
import Button from "@/components/Button";
import Link from "next/link";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/Table";

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
    <TableRow>
      <TableCell>{client_name}</TableCell>
      <TableCell>
        <Link
          href={`${baseUrl}/${client_id}`}
          className="text-primary-600 underline"
        >
          {client_id}
        </Link>
      </TableCell>
      <TableCell>
        <form action={action}>
          <Button action="danger" type="submit">
            Delete
          </Button>
        </form>
      </TableCell>
    </TableRow>
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

  const response = await getClientsPage(itemsPerPage, startIndex, isAdmin);
  const { totalResults } = response;
  const numberOfPages = Math.ceil(totalResults / itemsPerPage);

  const baseUrl = isAdmin ? "/clients" : "/me/clients";
  const clients = response.Resources;
  return (
    <>
      <Table>
        <TableHeader>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Client Id</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {clients.map(client => (
            <Row key={client.client_id} client={client} baseUrl={baseUrl} />
          ))}
        </TableBody>
      </Table>
      <Paginator numberOfPages={numberOfPages} />
    </>
  );
}
