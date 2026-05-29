// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { toast } from "@/components/toaster";
import { ScimReference, User } from "@/models/scim";
import { removeUserFromGroupReference } from "@/services/groups";
import ConfirmModal from "@/components/confirm-modal";

export type RemoveMembershipModalProps = {
  user: User;
  groupRef: ScimReference;
  show: boolean;
  onClose: () => void;
};

export default function RemoveMembershipModal(
  props: Readonly<RemoveMembershipModalProps>
) {
  const { user, groupRef, show, onClose } = props;

  const handleConfirm = async () => {
    const res = await removeUserFromGroupReference(user, groupRef);
    toast.toast(res);
    onClose();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Leave Group"
      title="Leave Group"
      onConfirm={handleConfirm}
      danger
    >
      Are you sure you want to leave the group <b>{groupRef.display}</b>?
    </ConfirmModal>
  );
}
