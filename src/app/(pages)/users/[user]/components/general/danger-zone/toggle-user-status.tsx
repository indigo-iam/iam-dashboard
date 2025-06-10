// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { User } from "@/models/scim";
import { changeUserStatus } from "@/services/users";

import { useState } from "react";

type DisableButtonProps = {
  user: User;
};

export function ToggleStatusButton(props: Readonly<DisableButtonProps>) {
  const { user } = props;
  const { active } = user;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  const title = `${active ? "Disable" : "Enable"} user ${user.name?.formatted}`;
  const confirmButtonText = active ? "Disable" : "Enabled";

  const handleConfirm = async () => {
    return changeUserStatus(user.id, !active);
  };

  return (
    <>
      <Button
        className={active ? "btn-danger-tertiary" : "btn-tertiary"}
        onClick={open}
      >
        {active ? "Disable" : "Enable"}
      </Button>
      <ConfirmModal
        show={show}
        onClose={close}
        danger={active}
        title={title}
        confirmButtonText={confirmButtonText}
        onConfirm={handleConfirm}
      >
        <span>
          {`Are you sure you want to ${active ? "disable" : "enable"} user`}{" "}
          <b>{user.name?.formatted}?</b> ({user.emails?.[0].value})
        </span>
      </ConfirmModal>
    </>
  );
}
