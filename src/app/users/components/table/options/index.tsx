// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { PowerIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import { Options, Option } from "@/components/options";
import ToggleUserStatusModal from "./user-status-modal";
import DeleteUserModal from "./delete-user-modal";

type UserOptions = {
  userId: string;
  userFormattedName: string;
  userEmail: string;
  userIsActive: boolean;
};

export default function UserOptions(props: Readonly<UserOptions>) {
  const { userId, userFormattedName, userEmail, userIsActive } = props;
  const [show, setShow] = useState<"TOGGLE_STATUS" | "DELETE_USER">();
  const close = () => setShow(undefined);
  return (
    <>
      <Options>
        {userIsActive ? (
          <Option onClick={() => setShow("TOGGLE_STATUS")} data-danger>
            <div className="flex items-center gap-2">
              <PowerIcon className="size-4" />
              <span>Disable</span>
            </div>
          </Option>
        ) : (
          <Option onClick={() => setShow("TOGGLE_STATUS")}>
            <div className="flex items-center gap-2">
              <PowerIcon className="size-4" />
              <span>Enable</span>
            </div>
          </Option>
        )}
        <Option onClick={() => setShow("DELETE_USER")} data-danger>
          <div className="flex items-center gap-2">
            <TrashIcon className="size-4" />
            <span>Delete</span>
          </div>
        </Option>
      </Options>
      <ToggleUserStatusModal
        userId={userId}
        userFormattedName={userFormattedName}
        userEmail={userEmail}
        userIsActive={userIsActive}
        show={show === "TOGGLE_STATUS"}
        onClose={close}
      />
      <DeleteUserModal
        userId={userId}
        userFormattedName={userFormattedName}
        userEmail={userEmail}
        show={show === "DELETE_USER"}
        onClose={close}
      />
    </>
  );
}
