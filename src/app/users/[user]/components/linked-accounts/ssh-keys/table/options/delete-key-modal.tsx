// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { SSHKey } from "@/models/indigo-user";
import { deleteSSHKey } from "@/services/users";

type DeleteSSHKeyModalProps = {
  userId: string;
  userName: string;
  sshKey: SSHKey;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
};

export default function DeleteSSHKeyModal(
  props: Readonly<DeleteSSHKeyModalProps>
) {
  const { userId, userName, sshKey, show, onClose, onDeleted } = props;

  const handleConfirm = async () => {
    await deleteSSHKey(userId, sshKey);
    onClose();
    onDeleted?.();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete"
      title="Delete SSH Key"
      onConfirm={handleConfirm}
      danger
    >
      <p>
        The following SSH Key will be removed from <b>{userName}</b>
      </p>
      <ul className="flex flex-col">
        <li className="inline-flex gap-1">
          <span className="font-bold">Label:</span>
          <span>{sshKey.display}</span>
        </li>
        <li className="inline-flex gap-1">
          <span className="font-bold">Fingerprint:</span>
          <span>{sshKey.fingerprint}</span>
        </li>
        <li className="inline-flex gap-1">
          <span className="font-bold">Value:</span>
          <span>{sshKey.value}</span>
        </li>
      </ul>
    </ConfirmModal>
  );
}
