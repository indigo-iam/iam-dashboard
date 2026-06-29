// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "@/components/link";

import ConfirmModal from "@/components/confirm-modal";
import { ModalProps } from "@/components/modal";
import { toast } from "@/components/toaster";
import { removeUserFromGroup } from "@/services/groups";

interface RevokeMemberFromGroupModalProps extends ModalProps {
  userId: string;
  userDisplay: string;
  groupId: string;
  groupDisplay: string;
  groupDescription?: string | null;
}

export default function RemoveMemberFromGroupModal(
  props: Readonly<RevokeMemberFromGroupModalProps>
) {
  const {
    userId,
    userDisplay,
    groupId,
    groupDisplay,
    groupDescription,
    ...modalProps
  } = props;

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
      <div className="space-y-2">
        <p>
          Are you sure you want to remove the user{" "}
          <Link href={`/users/${userId}`} className="underline">
            <b>{userDisplay}</b>
          </Link>{" "}
          from group <b>{groupDisplay}</b>{" "}
          {groupDescription && (
            <>
              (<span className="italic">{groupDescription}</span>)
            </>
          )}
          ?
        </p>
      </div>
    </ConfirmModal>
  );
}
