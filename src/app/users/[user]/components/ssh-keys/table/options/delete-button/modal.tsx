// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import InfoTable from "@/components/info-table";
import { SSHKey } from "@/models/indigo-user";
import { User } from "@/models/scim";
import { deleteSSHKey } from "@/services/users";

type DeleteSSHKeyConfirmModalProps = {
  user: User;
  sshKey: SSHKey;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
};

export default function DeleteSSHKeyConfirmModal(
  props: Readonly<DeleteSSHKeyConfirmModalProps>
) {
  const { user, sshKey, show, onClose, onDeleted } = props;

  const handleConfirm = async () => {
    await deleteSSHKey(user.id, sshKey);
    onClose();
    onDeleted?.();
  };

  const data = [
    { name: "Label", value: sshKey.display },
    { name: "Fingerprint", value: sshKey.fingerprint },
    { name: "Value", value: sshKey.value },
  ];

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete Key"
      title="Delete SSH Key"
      onConfirm={handleConfirm}
    >
      <p>
        The following SSH Key will be removed from <b>{user.name?.formatted}</b>
      </p>
      <InfoTable data={data} className="mt-2" />
    </ConfirmModal>
  );
}
