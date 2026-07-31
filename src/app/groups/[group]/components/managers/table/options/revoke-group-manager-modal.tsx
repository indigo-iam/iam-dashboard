// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { toast } from "@/components/toaster";
import { revokeGroupManager } from "@/services/groups";
import { Notice } from "@/components/notices";

type RevokeGroupManagerModal = {
  userId: string;
  userFormattedName: string;
  userEmail: string;
  groupId: string;
  groupName: string;
  show: boolean;
  onClose: () => void;
  onUnlinked?: () => void;
};

export default function RevokeGroupManagerModal(
  props: Readonly<RevokeGroupManagerModal>
) {
  const {
    userId,
    userFormattedName,
    userEmail,
    groupId,
    groupName,
    show,
    onClose,
    onUnlinked,
  } = props;
  const handleConfirm = async () => {
    const res = await revokeGroupManager(groupId, userId);
    toast.toast(res);
    onClose();
    onUnlinked?.();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Revoke"
      title="Revoke user from group managers?"
      onConfirm={handleConfirm}
      danger
    >
      <div className="space-y-4">
        <p>
          {" "}
          Are you sure you want revoke manager privileges for group{" "}
          <b>{groupName}</b> from the following user?
        </p>
        <Notice>
          <p>
            <b>{userFormattedName}</b>
          </p>
          <p className="text-sm">{userEmail}</p>
        </Notice>
      </div>
    </ConfirmModal>
  );
}
