// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { ScimReference } from "@/models/scim";
import { deleteGroupByReference } from "@/services/groups";

interface DeleteGroupModalProps {
  groupRef: ScimReference;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
}
export default function DeleteSubgroupModal(
  props: Readonly<DeleteGroupModalProps>
) {
  const { groupRef, show, onClose, onDeleted } = props;

  const handleConfirm = async () => {
    await deleteGroupByReference(groupRef);
    onClose();
    onDeleted?.();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete"
      onConfirm={handleConfirm}
      title={`Delete subgroup '${groupRef.display}'`}
      data-testid="modal"
      danger={true}
    >
      Are you sure you want to delete subgroup <b>{groupRef.display}</b>?
    </ConfirmModal>
  );
}
