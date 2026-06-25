// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import ToggleStatusModal from "@/app/components/clients/options/toggle-status-modal";
import { Button } from "@/components/buttons";
import { useState } from "react";

type DisableButtonProps = {
  clientId: string;
  clientName: string;
  clientDescription?: string;
  active: boolean;
};

export function ToggleStatusButton(props: Readonly<DisableButtonProps>) {
  const { clientId, clientName, clientDescription, active } = props;
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
      <ToggleStatusModal
        clientId={clientId}
        clientName={clientName}
        clientDescription={clientDescription}
        active={active}
        show={show}
        onClose={close}
      />
    </>
  );
}
