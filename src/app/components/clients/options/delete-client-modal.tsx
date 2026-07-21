// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
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
      title={`Delete client '${clientName}'`}
      danger={true}
    >
      <p>
        Are you sure you want to delete client <b>{clientName}</b>
        {clientDescription && (
          <>
            {" "}
            (<i>{clientDescription}</i>)
          </>
        )}
        ?
      </p>
    </ConfirmModal>
  );
}
