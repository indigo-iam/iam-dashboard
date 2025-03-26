// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { ScimReference, User } from "@/models/scim";
import { removeUserFromGroup } from "@/services/groups";

type ConfirmUnlinkUserModal = {
  user: User;
  groupRef: ScimReference;
  show: boolean;
  onClose: () => void;
};

export default function ConfirmUnlinkUserModal(
  props: Readonly<ConfirmUnlinkUserModal>
) {
  const { user, groupRef, show, onClose } = props;

  const handleConfirm = async () => {
    await removeUserFromGroup(groupRef.value, user);
    onClose();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Remove Membership"
      title="Remove User Membership"
      onConfirm={handleConfirm}
    >
      Are you sure you want to remove <b>{user.displayName}</b> from group{" "}
      <b>{groupRef.display}</b>?
    </ConfirmModal>
  );
}
