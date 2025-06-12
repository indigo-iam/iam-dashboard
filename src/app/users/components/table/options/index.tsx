// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Options, Option } from "@/components/options";
import { User } from "@/models/scim";
import ToggleUserStatusModal from "./user-status-modal";
import DeleteUserModal from "./delete-user-modal";
import { useState } from "react";

type UserOptions = {
  user: User;
};

export default function UserOptions(props: Readonly<UserOptions>) {
  const { user } = props;
  const [show, setShow] = useState<"TOGGLE_STATUS" | "DELETE_USER">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        <Option onClick={() => setShow("TOGGLE_STATUS")}>
          {user.active ? "Disable" : "Enable"}
        </Option>
        <Option onClick={() => setShow("DELETE_USER")} data-danger>
          Delete
        </Option>
      </Options>
      <ToggleUserStatusModal
        user={user}
        show={show === "TOGGLE_STATUS"}
        onClose={close}
      />
      <DeleteUserModal
        user={user}
        show={show === "DELETE_USER"}
        onClose={close}
      />
    </>
  );
}
