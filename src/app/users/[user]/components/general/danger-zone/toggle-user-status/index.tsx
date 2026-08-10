// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Button } from "@/components/buttons";
import ToggleUserStatusModal from "./modal";

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
  return (
    <>
      <Button
        className={userIsActive ? "btn-danger-tertiary" : "btn-tertiary"}
        onClick={open}
      >
        {userIsActive ? "Disable" : "Enable"}
      </Button>
      <ToggleUserStatusModal
        userId={userId}
        userFormattedName={userFormattedName}
        userEmail={userEmail}
        userIsActive={userIsActive}
        show={show}
        onClose={close}
      />
    </>
  );
}
