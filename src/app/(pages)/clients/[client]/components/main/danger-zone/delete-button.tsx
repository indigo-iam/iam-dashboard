// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { Client } from "@/models/client";
import { deleteClient } from "@/services/clients";
import { useState } from "react";

type DeleteButtonProps = {
  client: Client;
};

export function DeleteButton(props: Readonly<DeleteButtonProps>) {
  const { client } = props;
  const { client_name, client_id } = client;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-danger" onClick={open}>
        Delete
      </Button>
      <ConfirmModal
        show={show}
        onClose={close}
        title={`Delete client ${client_name}`}
        confirmButtonText="Delete client"
        onConfirm={() => deleteClient(client_id)}
        danger
      >
        <span>
          Are you sure you want to <b>delete</b> client{" "}
          <b>{client.client_name}?</b>
        </span>
      </ConfirmModal>
    </>
  );
}
