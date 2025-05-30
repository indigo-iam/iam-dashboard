// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { ScimReference, User } from "@/models/scim";
import ConfirmUnlinkUserModal from "./modal";

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
        title="Remove Membership"
        className="popover-option-danger"
        onClick={open}
      >
        Remove Membership
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
