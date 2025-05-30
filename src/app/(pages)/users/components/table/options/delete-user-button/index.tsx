// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { User } from "@/models/scim";
import { useState } from "react";
import DeleteUserModal from "./modal";

type DeleteUserButtonProps = {
  user: User;
};

export default function DeleteUserButton(
  props: Readonly<DeleteUserButtonProps>
) {
  const { user } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  return (
    <>
      <button type="button" className="popover-option-danger" onClick={open}>
        Delete
      </button>
      <DeleteUserModal show={show} user={user} onClose={close} />
    </>
  );
}
