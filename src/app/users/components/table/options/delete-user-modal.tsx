// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { type ModalProps } from "@/components/modal";
import { toast } from "@/components/toaster";
import { deleteUser } from "@/services/users";

interface DeleteUserModalProps extends ModalProps {
  userId: string;
  userFormattedName: string;
  userEmail: string;
  onUserDeleted?: () => void;
}

export default function DeleteUserModal(props: Readonly<DeleteUserModalProps>) {
  const { userId, userFormattedName, userEmail, ...modalProps } = props;
  const action = async () => {
    const res = await deleteUser(userId);
    if (res.type === "success") {
      res.description = `User ${userFormattedName} has been deleted`;
    }
    toast.toast(res);
  };
  return (
    <ConfirmModal
      {...modalProps}
      title={`Delete user '${userFormattedName}'`}
      onConfirm={action}
      danger
    >
      Are you sure you want to delete user <b>{userFormattedName}</b> (
      <i>{userEmail}</i>) from this organization?
    </ConfirmModal>
  );
}
