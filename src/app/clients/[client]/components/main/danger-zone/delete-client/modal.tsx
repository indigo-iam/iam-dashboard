// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Notice, Warning } from "@/components/notices";
import { toast } from "@/components/toaster";
import { deleteClient } from "@/services/clients";

type DeleteClientModalProps = {
  clientId: string;
  clientName: string;
  clientDescription: string | null;
  show: boolean;
  isAdmin: boolean;
  onClose: () => void;
  onDeleted?: () => void;
};

export default function DeleteClientModal(
  props: Readonly<DeleteClientModalProps>
) {
  const {
    clientId,
    clientName,
    clientDescription,
    show,
    isAdmin,
    onClose,
    onDeleted,
  } = props;

  const handleConfirm = async () => {
    const res = await deleteClient(clientId, isAdmin);
    toast.toast(res);
    onClose();
    onDeleted?.();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete"
      onConfirm={handleConfirm}
      title={`Delete client?`}
      danger={true}
    >
      <p className="text-center">
        Are you sure you want to delete the following client?
      </p>
      <Notice>
        <p>
          <b>{clientName}</b>
        </p>
        {clientDescription && <p className="text-sm">{clientDescription}</p>}
      </Notice>
      <Warning>
        Completely delete the client from this organization and revoke all its
        token. <b>This action can not be undone</b>.
      </Warning>
    </ConfirmModal>
  );
}
