// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Client } from "@/models/client";

type DeleteScopeModalProps = {
  scope: string;
  client: Client;
  show: boolean;
  onClose: () => void;
};

export default function DeleteScopeModal(
  props: Readonly<DeleteScopeModalProps>
) {
  const { scope, client, show, onClose } = props;
  const action = async () => {
    const scopes = client.scope?.split(" ") ?? [];
    const find = scopes.findIndex(s => s === scope);
    if (find > -1) {
      console.log("TBD");
    }
  };
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      title="Delete scope"
      confirmButtonText="Delete"
      onConfirm={action}
      danger
    >
      <p>
        Are you sure you want to delete the scope{" "}
        <span className="font-bold">{scope}</span> from client{" "}
        <span className="italic">{client.client_name}</span>?
      </p>
    </ConfirmModal>
  );
}
