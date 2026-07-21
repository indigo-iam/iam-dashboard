// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { removeOwner } from "@/services/clients";

type RemoveOwnerModalProps = {
  clientId: string;
  clientName: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  show: boolean;
  onClose: () => void;
};

export default function RemoveOwnerModal(
  props: Readonly<RemoveOwnerModalProps>
) {
  const {
    clientId,
    clientName,
    ownerId,
    ownerName,
    ownerEmail,
    show,
    onClose,
  } = props;
  const action = async () => {
    await removeOwner(clientId, ownerId);
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
        <span className="font-medium">{ownerName}</span> ({ownerEmail}) from the
        owners of the client <span className="font-medium">{clientName}</span>?
      </p>
    </ConfirmModal>
  );
}
