// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { ManagedGroup } from "@/models/groups";
import { deleteManagedGroup } from "@/services/groups";

type DeleteManagedGroupModalProps = {
  group: ManagedGroup;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
};

export default function DeleteManagedGroupModal(
  props: Readonly<DeleteManagedGroupModalProps>
) {
  const { group, show, onClose, onDeleted } = props;

  const handleConfirm = async () => {
    await deleteManagedGroup(group);
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
      danger
    >
      Are you sure you want to delete group <b>{group.name}</b>?
    </ConfirmModal>
  );
}
