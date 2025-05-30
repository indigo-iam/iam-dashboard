// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { ModalProps } from "@/components/modal";
import { User } from "@/models/scim";
import { changeUserStatus } from "@/services/users";

interface ToggleUserModalProps extends ModalProps {
  user: User;
}

export default function ToggleUserStatusModal(
  props: Readonly<ToggleUserModalProps>
) {
  const { user, show, onClose } = props;
  const action = async () => {
    const newStatus = !(user.active ?? false);
    await changeUserStatus(user.id, newStatus);
    onClose();
  };
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      title={user.active ? "Disable User" : "Enable User"}
      onConfirm={action}
    >
      <p>
        Are you sure you want to <b>{user.active ? "disable" : "enable"}</b> the
        user <b>{user.displayName}</b>?
      </p>
    </ConfirmModal>
  );
}
