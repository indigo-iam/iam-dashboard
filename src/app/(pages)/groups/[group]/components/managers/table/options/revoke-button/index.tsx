"use client";
import ConfirmRevokeGroupManagerModal from "./modal";
import { Group } from "@/models/groups";
import { User } from "@/models/scim";
import { useState } from "react";

type RevokeManagerButtonProps = {
  user: User;
  group: Group;
};

export default function RevokeManagerButton(
  props: Readonly<RevokeManagerButtonProps>
) {
  const { user, group } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <button
        type="button"
        className="popover-option text-danger"
        onClick={open}
      >
        Revoke Group Manager
      </button>
      <ConfirmRevokeGroupManagerModal
        user={user}
        group={group}
        show={show}
        onClose={close}
      />
    </>
  );
}
