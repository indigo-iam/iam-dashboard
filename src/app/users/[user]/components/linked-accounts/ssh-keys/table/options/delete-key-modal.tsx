// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Field, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { SSHKey } from "@/models/indigo-user";
import { deleteSSHKey } from "@/services/users";

type DeleteSSHKeyModalProps = {
  userId: string;
  sshKey: SSHKey;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
};

export default function DeleteSSHKeyModal(
  props: Readonly<DeleteSSHKeyModalProps>
) {
  const { userId, sshKey, show, onClose, onDeleted } = props;

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
      <p className="py-2 text-center">
        Are you sure you want to delete the following SSH key?
      </p>
      <Field>
        <Label>Label</Label>
        <Input value={sshKey.display} disabled />
      </Field>
      <Field>
        <Label>Fingerprint</Label>
        <Input value={sshKey.fingerprint} disabled />
      </Field>
      <Field>
        <Label>Public key</Label>
        <p className="font-code text-sm break-all">{sshKey.value}</p>
      </Field>
    </ConfirmModal>
  );
}
