"use client";
import { useState } from "react";
import ConfirmUnlinkUserModal from "./modal";
import { ScimReference } from "@/models/scim";

export type RemoveMembershipProps = {
  userRef: ScimReference;
  group: ScimReference;
};

export default function RemoveMembership(
  props: Readonly<RemoveMembershipProps>
) {
  const { userRef, group } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  return (
    <>
      <button
        type="button"
        title="Remove Membership"
        className="popover-option text-danger"
        onClick={open}
      >
        Remove Membership
      </button>
      <ConfirmUnlinkUserModal
        userRef={userRef}
        group={group}
        show={show}
        onClose={close}
      />
    </>
  );
}
