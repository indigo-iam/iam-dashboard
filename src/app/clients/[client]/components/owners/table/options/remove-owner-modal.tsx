// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Notice } from "@/components/notices";
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
      title={`Remove owner from client '${clientName}'?`}
      confirmButtonText="Remove"
      onConfirm={action}
      danger
    >
      <div className="space-y-4">
        <p>Are you sure you want to remove the user</p>
        <Notice>
          <p>
            <b>{ownerName}</b>
          </p>
          <p className="text-sm">{ownerEmail}</p>
        </Notice>
        <p>
          from the owners of the client <b>{clientName}</b>?
        </p>
      </div>
    </ConfirmModal>
  );
}
