// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import ToggleStatusModal from "@/app/components/clients/options/toggle-status-modal";
import { Button } from "@/components/buttons";
import { Client } from "@/models/client";
import { useState } from "react";

type DisableButtonProps = {
  client: Client;
};

export function ToggleStatusButton(props: Readonly<DisableButtonProps>) {
  const { client } = props;
  const { active } = client;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button
        className={active ? "btn-danger-tertiary" : "btn-tertiary"}
        onClick={open}
      >
        {active ? "Disable" : "Enable"}
      </Button>
      <ToggleStatusModal client={client} show={show} onClose={close} />
    </>
  );
}
