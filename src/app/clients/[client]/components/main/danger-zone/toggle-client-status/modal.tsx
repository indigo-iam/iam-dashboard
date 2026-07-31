// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Notice, Warning } from "@/components/notices";
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
  const title = `${active ? "Disable" : "Enable"} client?`;

  async function handleConfirm() {
    const res = active
      ? await disableClient(clientId)
      : await enableClient(clientId);
    toast.toast(res);
    onClose();
  }

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText={active ? "Disable" : "Enable"}
      onConfirm={handleConfirm}
      title={title}
      danger={active}
    >
      <p className="text-center">
        Are you sure you want to {active ? "disable" : "enable"} the following
        client?
      </p>
      <Notice>
        <p>
          <b>{clientName}</b>
        </p>
        {clientDescription && <p className="text-sm">{clientDescription}</p>}
      </Notice>
      {/* prettier-ignore */}
      <Warning>
        By disabling this client it will not release new tokens.
      </Warning>
    </ConfirmModal>
  );
}
