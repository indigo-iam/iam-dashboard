// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { changeUserStatus } from "@/services/users";

type DisableButtonProps = {
  userId: string;
  userFormattedName: string;
  userEmail: string;
  userIsActive: boolean;
};

export function ToggleStatusButton(props: Readonly<DisableButtonProps>) {
  const { userId, userFormattedName, userEmail, userIsActive } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  const title = `${userIsActive ? "Disable" : "Enable"} user ${userFormattedName}`;
  const confirmButtonText = userIsActive ? "Disable" : "Enabled";

  const handleConfirm = async () => {
    return changeUserStatus(userId, !userIsActive);
  };

  return (
    <>
      <Button
        className={userIsActive ? "btn-danger-tertiary" : "btn-tertiary"}
        onClick={open}
      >
        {userIsActive ? "Disable" : "Enable"}
      </Button>
      <ConfirmModal
        show={show}
        onClose={close}
        danger={userIsActive}
        title={title}
        confirmButtonText={confirmButtonText}
        onConfirm={handleConfirm}
      >
        <span>
          {`Are you sure you want to ${userIsActive ? "disable" : "enable"} user`}{" "}
          <b>{userFormattedName}?</b> ({userEmail})
        </span>
      </ConfirmModal>
    </>
  );
}
