import { Client } from "@/models/client";
import Link from "@/components/Link";
import ClientOptions from "./Options";

type RowProps = {
  client: Client;
};

function Row(props: Readonly<RowProps>) {
  const { client } = props;
  const { client_id, client_name } = client;
  return (
    <tr className="tbl-hover tbl-tr">
      <td className="tbl-td">{client_name}</td>
      <td className="tbl-td">
        <Link href={`/clients/${client_id}`}>{client_id}</Link>
      </td>
      <td className="tbl-td w-1/12 text-center">
        <ClientOptions client={client} />
      </td>
    </tr>
  );
}

type ClientsTableProps = {
  clients: Client[];
};

export default function ClientsTable(props: Readonly<ClientsTableProps>) {
  const { clients } = props;
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="tbl-hover">
          <th className="tbl-th text-left">Name</th>
          <th className="tbl-th text-left">Client Id</th>
          <th className="tbl-th text-center" />
        </tr>
      </thead>
      <tbody>
        {clients.map(client => (
          <Row key={client.client_id} client={client} />
        ))}
      </tbody>
    </table>
  );
}
