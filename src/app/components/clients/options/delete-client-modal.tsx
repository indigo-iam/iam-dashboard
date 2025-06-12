// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Client } from "@/models/client";
import { deleteClient } from "@/services/clients";

interface DeleteClientModalProps {
  client: Client;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
}
export default function DeleteClientModal(
  props: Readonly<DeleteClientModalProps>
) {
  const { client, show, onClose, onDeleted } = props;
  const { client_name, client_id } = client;
  const handleConfirm = async () => {
    await deleteClient(client.client_id);
    onClose();
    onDeleted?.();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete Client"
      onConfirm={handleConfirm}
      title="Delete Client"
      danger={true}
    >
      Are you sure you want to delete the following client?
      <ul className="flex flex-col">
        <li className="inline-flex gap-1">
          <span className="font-bold">Name:</span>
          <span>{client_name}</span>
        </li>
        <li className="inline-flex gap-1">
          <span className="font-bold">Client ID:</span>
          <span>{client_id}</span>
        </li>
      </ul>
    </ConfirmModal>
  );
}
