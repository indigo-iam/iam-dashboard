// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "@/components/link";

import ConfirmModal from "@/components/confirm-modal";
import { ModalProps } from "@/components/modal";
import { toast } from "@/components/toaster";
import { ScimReference } from "@/models/scim";
import { removeUserByRefFromGroupReference } from "@/services/groups";
import { makeScimReferenceForGroup } from "@/utils/scim";

interface RevokeMemberFromGroupModalProps extends ModalProps {
  userRef: ScimReference;
  groupName: string;
  groupId: string;
  groupDescription?: string | null;
}

export default function RemoveMemberFromGroupModal(
  props: Readonly<RevokeMemberFromGroupModalProps>
) {
  const { userRef, groupId, groupName, groupDescription, ...modalProps } =
    props;

  async function action() {
    const groupRef = makeScimReferenceForGroup(groupId, groupName);
    const res = await removeUserByRefFromGroupReference(userRef, groupRef);
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
          <Link href={`/users/${userRef.value}`} className="underline">
            <b>{userRef.display}</b>
          </Link>{" "}
          from group <b>{groupName}</b>{" "}
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
