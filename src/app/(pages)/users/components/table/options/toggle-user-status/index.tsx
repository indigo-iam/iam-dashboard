// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { User } from "@/models/scim";
import { useState } from "react";
import ToggleUserStatusModal from "./modal";
import { useClose } from "@headlessui/react";

type ToggleUserStatusProps = {
  user: User;
};

export default function ToggleUserStatus(
  props: Readonly<ToggleUserStatusProps>
) {
  const { user } = props;
  const { active } = user;
  const [show, setShow] = useState(false);
  const closePopover = useClose();
  const open = () => setShow(true);
  const close = () => {
    setShow(false);
    closePopover();
  };

  return (
    <>
      <button className="popover-option" type="button" onClick={open}>
        {active ? "Disable" : "Enable"}
      </button>
      <ToggleUserStatusModal show={show} onClose={close} user={user} />
    </>
  );
}
