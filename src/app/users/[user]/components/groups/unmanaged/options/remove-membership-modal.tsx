// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { toast } from "@/components/toaster";
import { removeUserFromGroup } from "@/services/groups";
import ConfirmModal from "@/components/confirm-modal";

export type RemoveMembershipModalProps = {
  userId: string;
  userDisplay: string;
  groupId: string;
  groupDisplay: string;
  show: boolean;
  onClose: () => void;
};

export default function RemoveMembershipModal(
  props: Readonly<RemoveMembershipModalProps>
) {
  const { userId, userDisplay, groupId, groupDisplay, show, onClose } = props;

  async function handleConfirm() {
    const res = await removeUserFromGroup(
      userId,
      userDisplay,
      groupId,
      groupDisplay
    );
    toast.toast(res);
    onClose();
  }

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Leave Group"
      title="Leave Group"
      onConfirm={handleConfirm}
      danger
    >
      Are you sure you want to leave the group <b>{groupDisplay}</b>?
    </ConfirmModal>
  );
}
