// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "@/components/link";

import ConfirmModal from "@/components/confirm-modal";
import { toast } from "@/components/toaster";
import { revokeGroupManager } from "@/services/groups";

type RevokeGroupManagerModal = {
  userId: string;
  userFormattedName: string;
  userEmail: string;
  groupId: string;
  groupName: string;
  groupDescription?: string | null;
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
    groupDescription,
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
      title="Revoke group manager privileges"
      onConfirm={handleConfirm}
      danger
    >
      <p>
        Are you sure you want to revoke group manager privileges from user{" "}
        <Link href={`/users/${userId}`} className="underline">
          <b className="text-nowrap">{userFormattedName}</b> (
          <i className="text-nowrap">{userEmail}</i>)
        </Link>{" "}
        for group <b>{groupName}</b>
        {groupDescription && (
          <>
            {" "}
            (<i>{groupDescription}</i>)
          </>
        )}
        ?
      </p>
    </ConfirmModal>
  );
}
