// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { ModalProps } from "@/components/modal";
import { toast } from "@/components/toaster";
import { removeUserFromGroup } from "@/services/groups";
import { Notice } from "@/components/notices";

interface RevokeMemberFromGroupModalProps extends ModalProps {
  userId: string;
  userDisplay: string;
  groupId: string;
  groupDisplay: string;
}

export default function RemoveMemberFromGroupModal(
  props: Readonly<RevokeMemberFromGroupModalProps>
) {
  const { userId, userDisplay, groupId, groupDisplay, ...modalProps } = props;

  async function action() {
    const res = await removeUserFromGroup(
      userId,
      userDisplay,
      groupId,
      groupDisplay
    );
    toast.toast(res);
  }

  return (
    <ConfirmModal
      title="Remove member from group"
      onConfirm={action}
      danger
      {...modalProps}
    >
      <div className="space-y-4">
        <p>
          Are you sure you want to remove the user from group{" "}
          <b>{groupDisplay}</b>?
        </p>
        <Notice>
          <p>
            <b>{userDisplay}</b>
          </p>
        </Notice>
      </div>
    </ConfirmModal>
  );
}
