"use client";
import Button from "@/components/Button";
import Paginator from "@/components/Paginator";
import { MeClient, MeClients } from "@/models/me";
import { deleteClient } from "@/services/clients";
import { fetchClients } from "@/services/me";
import Link from "next/link";
import { useState } from "react";

const ClientRow = (props: {
  client: MeClient;
  deleteClient: (client_id: string) => void;
}) => {
  const { client_id, client_name } = props.client;

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
        <Button action="danger" onClick={() => props.deleteClient(client_id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export const ClientsTable = (props: { meClients: MeClients }) => {
  const [meClients, setMeClients] = useState(props.meClients);
  const [currentPage, setCurrentPage] = useState(0);
  const totalResults = meClients.totalResults;
  const itemsPerPage = props.meClients.itemsPerPage;
  const numberOfPages = Math.ceil(totalResults / itemsPerPage);
  const handleDelete = async (client_id: string) => {
    try {
      await deleteClient(client_id);
      let newCurrentPage = currentPage;
      if (meClients.Resources.length == 1) {
        newCurrentPage--;
      }
      const newMeClients = await fetchClients(
        newCurrentPage * itemsPerPage + 1
      );
      setMeClients(newMeClients);
      setCurrentPage(newCurrentPage);
    } catch (error) {
      alert(error);
    }
  };
  const rows = meClients.Resources.map(client => (
    <ClientRow
      key={client.client_id}
      client={client}
      deleteClient={handleDelete}
    />
  ));
  const showPaginator = totalResults > meClients.Resources.length;

  return (
    <>
      <table>
        <tbody>{rows}</tbody>
      </table>
      {showPaginator && (
        <Paginator
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          onChangePage={async page => {
            const newMeClients = await fetchClients(page * itemsPerPage + 1);
            setMeClients(newMeClients);
            setCurrentPage(page);
          }}
        />
      )}
    </>
  );
};
