// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Client } from "@/models/client";
import { disableClient, enableClient } from "@/services/clients";

type ToggleStatusModalProps = {
  client: Client;
  show: boolean;
  onClose: () => void;
};

export default function ToggleStatusModal(
  props: Readonly<ToggleStatusModalProps>
) {
  const { client, show, onClose } = props;
  const { client_name, client_description, active } = client;
  const title = `${active ? "Disable" : "Enable"} client '${client_name}'`;

  const handleConfirm = async () => {
    active ? await disableClient(client) : await enableClient(client);
    onClose();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText={active ? "Disable" : "Enable"}
      onConfirm={handleConfirm}
      title={title}
      danger={active}
    >
      <p>
        Are you sure you want to {active ? "disable" : "enable"} the client{" "}
        <b>{client_name}</b>
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
