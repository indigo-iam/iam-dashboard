// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { useState } from "react";
import { ScimReference, User } from "@/models/scim";
import { removeUserFromGroup } from "@/services/groups";
import ConfirmModal from "@/components/confirm-modal";

type ConfirmUnlinkUserModal = {
  user: User;
  groupRef: ScimReference;
  show: boolean;
  onClose: () => void;
};

function ConfirmUnlinkUserModal(props: Readonly<ConfirmUnlinkUserModal>) {
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
    >
      Are you sure you want to leave the group <b>{groupRef.display}</b>?
    </ConfirmModal>
  );
}

export type RemoveMembershipProps = {
  user: User;
  groupRef: ScimReference;
};

export default function RemoveMembership(
  props: Readonly<RemoveMembershipProps>
) {
  const { user, groupRef } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  return (
    <>
      <button
        type="button"
        title="Leave Group"
        className="popover-option text-danger"
        onClick={open}
      >
        Leave Group
      </button>
      <ConfirmUnlinkUserModal
        user={user}
        groupRef={groupRef}
        show={show}
        onClose={close}
      />
    </>
  );
}
