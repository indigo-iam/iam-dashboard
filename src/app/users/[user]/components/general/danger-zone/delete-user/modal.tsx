// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { type ModalProps } from "@/components/modal";
import { Notice, Warning } from "@/components/notices";
import { toast } from "@/components/toaster";
import { deleteUser } from "@/services/users";

interface DeleteUserModalProps extends ModalProps {
  userId: string;
  userFormattedName: string;
  userEmail: string;
  onDeleted?: () => void;
}

export default function DeleteUserModal(props: Readonly<DeleteUserModalProps>) {
  const { userId, userFormattedName, userEmail, onDeleted, ...modalProps } =
    props;
  const action = async () => {
    const res = await deleteUser(userId);
    if (res.type === "success") {
      res.description = `User ${userFormattedName} has been deleted`;
    }
    toast.toast(res);
    onDeleted?.();
  };
  return (
    <ConfirmModal
      {...modalProps}
      title={`Delete user '${userFormattedName}'?`}
      onConfirm={action}
      danger
    >
      <p className="text-center">
        Are you sure you want to delete the following user from this
        organization?
      </p>
      <Notice>
        <div className="flex flex-col items-center">
          <p>
            <b>{userFormattedName}</b>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-200">
            ({userEmail})
          </p>
        </div>
      </Notice>
      <Warning>
        The user will be completely removed from this organization and they will
        be not able any more to access to resources.{" "}
        <b>
          <br />
          This action can not be undone
        </b>
        .
      </Warning>
    </ConfirmModal>
  );
}
