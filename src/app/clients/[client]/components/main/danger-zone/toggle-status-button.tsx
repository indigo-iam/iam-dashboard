// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { Client } from "@/models/client";
import { disableClient, enableClient } from "@/services/clients";
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
  const title = `${active ? "Disable" : "Enable"} client ${client.client_name}`;
  const confirmButtonText = active ? "Disable" : "Enabled";
  const text = `Are you sure you want to ${active ? "disable" : "enable"} client `;

  const handleConfirm = async () => {
    return client.active ? disableClient(client) : enableClient(client);
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
          {text} <b>{client.client_name}?</b>
        </span>
      </ConfirmModal>
    </>
  );
}
