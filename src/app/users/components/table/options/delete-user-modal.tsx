// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { type ModalProps } from "@/components/modal";
import { User } from "@/models/scim";
import { deleteUser } from "@/services/users";

interface DeleteUserModalProps extends ModalProps {
  user: User;
  onUserDeleted?: () => void;
}

export default function DeleteUserModal(props: Readonly<DeleteUserModalProps>) {
  const { user, onUserDeleted, ...modalProps } = props;
  const action = async () => {
    await deleteUser(user);
  };
  return (
    <ConfirmModal
      {...modalProps}
      title={`Delete user '${user?.displayName}'`}
      onConfirm={action}
      danger
    >
      Are you sure you want to delete user <b>{user?.name?.formatted}</b> (
      <i>{user?.emails?.[0].value}</i>) from this organization?
    </ConfirmModal>
  );
}
