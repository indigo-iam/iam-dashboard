import { Client } from "@/models/client";
import Link from "@/components/Link";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/Table";
import DeleteClientButton from "./DeleteClientButton";

type RowProps = {
  client: Client;
  onDeleted?: () => void;
};

function Row(props: Readonly<RowProps>) {
  const { client, onDeleted } = props;
  const { client_id, client_name } = client;
  return (
    <TableRow>
      <TableCell>{client_name}</TableCell>
      <TableCell>
        <Link href={`/clients/${client_id}`}>{client_id}</Link>
      </TableCell>
      <TableCell className="text-center">
        <DeleteClientButton client={client} onDeleted={onDeleted} />
      </TableCell>
    </TableRow>
  );
}

type ClientsTableProps = {
  clients: Client[];
  onClientDeleted?: () => void;
};

export default function ClientsTable(props: Readonly<ClientsTableProps>) {
  const { clients, onClientDeleted } = props;
  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Client Id</TableHeaderCell>
        <TableHeaderCell className="text-center">Actions</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {clients.map(client => (
          <Row
            key={client.client_id}
            client={client}
            onDeleted={onClientDeleted}
          />
        ))}
      </TableBody>
    </Table>
  );
}
