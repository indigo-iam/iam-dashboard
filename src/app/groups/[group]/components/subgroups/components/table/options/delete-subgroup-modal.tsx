// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { useToaster } from "@/components/toaster";
import { ScimReference } from "@/models/scim";
import { deleteGroup } from "@/services/groups";

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
  const { toast } = useToaster();

  const handleConfirm = async () => {
    const res = await deleteGroup(groupRef.value);
    toast(res);
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
      danger={true}
    >
      Are you sure you want to delete subgroup <b>{groupRef.display}</b>?
    </ConfirmModal>
  );
}
