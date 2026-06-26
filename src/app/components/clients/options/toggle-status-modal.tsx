// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { toast } from "@/components/toaster";
import { disableClient, enableClient } from "@/services/clients";

type ToggleStatusModalProps = {
  clientId: string;
  clientName: string;
  clientDescription: string | null;
  active: boolean;
  show: boolean;
  onClose: () => void;
};

export default function ToggleStatusModal(
  props: Readonly<ToggleStatusModalProps>
) {
  const { clientId, clientName, clientDescription, active, show, onClose } =
    props;
  const title = `${active ? "Disable" : "Enable"} client '${clientName}'`;

  const handleConfirm = async () => {
    const res = active
      ? await disableClient(clientId)
      : await enableClient(clientId);
    toast.toast(res);
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
        <b>{clientName}</b>
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
