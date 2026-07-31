// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Warning } from "@/components/notices";
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
      <div className="rounded border-s-4 bg-gray-100 p-4 dark:border-gray-200 dark:bg-gray-500">
        <p>
          <b>{clientName}</b>
        </p>
        {clientDescription && <p className="text-sm">{clientDescription}</p>}
      </div>
      {/* prettier-ignore */}
      <Warning>
        By disabling this client it will not release new tokens and the already
        released access tokens and refresh tokens are{" "}
        <b>immediately revoked</b>.
      </Warning>
    </ConfirmModal>
  );
}
