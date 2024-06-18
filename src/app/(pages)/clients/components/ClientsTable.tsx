"use client";
import Button from "@/components/Button";
import Paginator from "@/components/Paginator";
import { MeClient, MeClients } from "@/models/me";
import { deleteClient } from "@/services/clients";
import { fetchClients } from "@/services/me";
import { useState } from "react";

const ClientRow = (props: {
  client: MeClient;
  deleteClient: (client_id: string) => void;
}) => {
  return (
    <tr key={props.client.client_id}>
      <td>{props.client.client_name}</td>
      <td>{props.client.client_id}</td>
      <td>
        <Button
          color="danger"
          onClick={() => props.deleteClient(props.client.client_id)}
        >
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
