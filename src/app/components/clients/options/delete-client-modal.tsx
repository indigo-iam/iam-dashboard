// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Client } from "@/models/client";
import { deleteClient } from "@/services/clients";

type DeleteClientModalProps = {
  client: Client;
  show: boolean;
  isAdmin: boolean;
  onClose: () => void;
  onDeleted?: () => void;
};

export default function DeleteClientModal(
  props: Readonly<DeleteClientModalProps>
) {
  const { client, show,isAdmin, onClose, onDeleted } = props;
  const { client_name, client_description } = client;

  const handleConfirm = async () => {
    await deleteClient(client.client_id, isAdmin);
    onClose();
    onDeleted?.();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete"
      onConfirm={handleConfirm}
      title={`Delete client '${client_name}'`}
      danger={true}
    >
      <p>
        Are you sure you want to delete client <b>{client_name}</b>
        {client_description && (
          <>
            {" "}
            (<i>{client_description}</i>)
          </>
        )}
        ?
      </p>
    </ConfirmModal>
  );
}
