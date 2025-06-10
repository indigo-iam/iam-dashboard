// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Group } from "@/models/groups";
import { User } from "@/models/scim";
import { revokeGroupManager } from "@/services/groups";

type ConfirmRevokeGroupManagerModal = {
  user: User;
  group: Group;
  show: boolean;
  onClose: () => void;
  onUnlinked?: () => void;
};

export default function ConfirmRevokeGroupManagerModal(
  props: Readonly<ConfirmRevokeGroupManagerModal>
) {
  const { user, group, show, onClose, onUnlinked } = props;

  const handleConfirm = async () => {
    await revokeGroupManager(group.id, user.id);
    onClose();
    onUnlinked?.();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Remove Group Manager"
      title="Revoke Group Manager Privileges"
      onConfirm={handleConfirm}
    >
      Are you sure you want to revoke group manager privileges from user{" "}
      <b>{user.name?.formatted}</b> for group <b>{group.displayName}</b>?
    </ConfirmModal>
  );
}
