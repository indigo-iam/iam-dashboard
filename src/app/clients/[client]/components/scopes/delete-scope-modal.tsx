// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Notice } from "@/components/notices";
import { Client } from "@/models/client";
import { editClient } from "@/services/clients";

type DeleteScopeModalProps = {
  scope: string;
  client: Client;
  isAdmin: boolean;
  show: boolean;
  onClose: () => void;
};

export default function DeleteScopeModal(
  props: Readonly<DeleteScopeModalProps>
) {
  const { scope, client, isAdmin, show, onClose } = props;
  const action = async () => {
    const scopes = client.scope?.split(" ") ?? [];
    const find = scopes.indexOf(scope);
    if (find > -1) {
      scopes.splice(find, 1);
      const scope = scopes.join(" ");
      await editClient({ ...client, scope }, isAdmin);
    }
    onClose();
  };
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      title={`Delete scope '${scope}'?`}
      confirmButtonText="Delete"
      onConfirm={action}
      danger
    >
      <div className="space-y-4">
        <p>
          Are you sure you want to delete the scope{" "}
          <span className="font-bold">{scope}</span> from the following client?
        </p>
        <Notice>
          <p>
            <b>{client.client_name}</b>
          </p>
          {client.client_description && (
            <p className="text-sm">{client.client_description}</p>
          )}
        </Notice>
      </div>
    </ConfirmModal>
  );
}
