// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { ScimReference, User } from "@/models/scim";
import { removeUserFromGroup } from "@/services/groups";
import ConfirmModal from "@/components/confirm-modal";
import { useState } from "react";

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
    await removeUserFromGroup(groupRef.value, user);
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
