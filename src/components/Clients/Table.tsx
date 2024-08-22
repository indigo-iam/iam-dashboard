import { Client } from "@/models/client";
import Link from "next/link";
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
};

function Row(props: Readonly<RowProps>) {
  const { client } = props;
  const { client_id, client_name } = client;
  return (
    <TableRow>
      <TableCell>{client_name}</TableCell>
      <TableCell>
        <Link
          href={`/clients/${client_id}`}
          className="text-primary-800 underline"
        >
          {client_id}
        </Link>
      </TableCell>
    </TableRow>
  );
}

type ClientsTableProps = {
  clients: Client[];
};

export default function ClientsTable(props: Readonly<ClientsTableProps>) {
  const { clients } = props;
  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Client Id</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {clients.map(client => (
          <Row key={client.client_id} client={client} />
        ))}
      </TableBody>
    </Table>
  );
}
