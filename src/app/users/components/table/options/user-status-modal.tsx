// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { ModalProps } from "@/components/modal";
import { toast } from "@/components/toaster";
import { changeUserStatus } from "@/services/users";

interface ToggleUserModalProps extends ModalProps {
  userId: string;
  userFormattedName: string;
  userEmail: string;
  userIsActive: boolean;
}

export default function ToggleUserStatusModal(
  props: Readonly<ToggleUserModalProps>
) {
  const {
    userId, //
    userFormattedName,
    userEmail,
    userIsActive,
    show,
    onClose,
  } = props;

  const title = `${userIsActive ? "Disable user" : "Enable user"} '${userFormattedName}'`;

  async function action() {
    const newStatus = !userIsActive;
    const res = await changeUserStatus(userId, newStatus);
    toast.toast(res);
    onClose();
  }
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      title={title}
      onConfirm={action}
    >
      <p>
        Are you sure you want to {userIsActive ? "disable" : "enable"} the user{" "}
        <b>{userFormattedName}</b> (<i>{userEmail}</i>)?
      </p>
    </ConfirmModal>
  );
}
