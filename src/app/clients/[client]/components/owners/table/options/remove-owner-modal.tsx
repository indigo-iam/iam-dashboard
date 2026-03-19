// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Client } from "@/models/client";
import { User } from "@/models/scim";
import { removeOwner } from "@/services/clients";

type RemoveOwnerModalProps = {
  owner: User;
  client: Client;
  show: boolean;
  onClose: () => void;
};

export default function RemoveOwnerModal(
  props: Readonly<RemoveOwnerModalProps>
) {
  const { owner, client, show, onClose } = props;
  const action = async () => {
    await removeOwner(client, owner);
    onClose();
  };
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      title="Remove owner"
      confirmButtonText="Remove"
      onConfirm={action}
      danger
    >
      <p>
        Are you sure you want to remove the user{" "}
        <span className="font-medium">
          {owner.name?.formatted ?? "'unknown name'"}
        </span>{" "}
        ({owner.emails?.[0].value ?? "'unknown email'"}) from the owners of the
        client <span className="font-medium">{client.client_name}</span>?
      </p>
    </ConfirmModal>
  );
}
