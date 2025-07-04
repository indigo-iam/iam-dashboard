// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { ScimReference } from "@/models/scim";
import { deleteGroup } from "@/services/groups";

interface DeleteGroupModalProps {
  groupRef: ScimReference;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
}
export default function DeleteGroupModal(
  props: Readonly<DeleteGroupModalProps>
) {
  const { groupRef, show, onClose, onDeleted } = props;

  const handleConfirm = async () => {
    await deleteGroup(groupRef.value);
    onClose();
    onDeleted?.();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete Group"
      onConfirm={handleConfirm}
      title="Delete Group"
      data-testid="modal"
      danger={true}
    >
      Are you sure you want to delete group <b>{groupRef?.display}</b>?
    </ConfirmModal>
  );
}
