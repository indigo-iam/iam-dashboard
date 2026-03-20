// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Group } from "@/models/groups";
import { deleteGroup } from "@/services/groups";

interface DeleteGroupModalProps {
  group: Group;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
}
export default function DeleteGroupModal(
  props: Readonly<DeleteGroupModalProps>
) {
  const { group, show, onClose, onDeleted } = props;
  const indigoGroup = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  const description = indigoGroup.description;

  const handleConfirm = async () => {
    await deleteGroup(group);
    onClose();
    onDeleted?.();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete"
      onConfirm={handleConfirm}
      title={`Delete group '${group.displayName}'`}
      danger={true}
    >
      Are you sure you want to delete group <b>{group.displayName}</b>
      {description && (
        <>
          {" "}
          (<i>{description}</i>)
        </>
      )}
      ?
    </ConfirmModal>
  );
}
