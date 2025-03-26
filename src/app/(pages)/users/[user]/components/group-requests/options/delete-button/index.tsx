// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { User } from "@/models/scim";
import { GroupRequest } from "@/models/group-requests";
import { useState } from "react";
import DeleteGroupRequestModal from "./modal";

type DeleteGroupRequestButtonProps = {
  user: User;
  isMe: boolean;
  groupRequest: GroupRequest;
};

export default function DeleteGroupRequestButton(
  props: Readonly<DeleteGroupRequestButtonProps>
) {
  const { user, isMe, groupRequest } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <button
        type="submit"
        className="popover-option text-danger"
        onClick={open}
      >
        Delete Group Request
      </button>
      <DeleteGroupRequestModal
        user={user}
        isMe={isMe}
        groupRequest={groupRequest}
        show={show}
        onClose={close}
      />
    </>
  );
}
