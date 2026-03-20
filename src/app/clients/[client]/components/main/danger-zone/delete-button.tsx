// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import DeleteClientModal from "@/app/components/clients/options/delete-client-modal";
import { Button } from "@/components/buttons";
import { Client } from "@/models/client";
import { useState } from "react";

type DeleteButtonProps = {
  client: Client;
  isAdmin: boolean;
};

export function DeleteButton(props: Readonly<DeleteButtonProps>) {
  const { client, isAdmin } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-danger" onClick={open}>
        Delete
      </Button>
      <DeleteClientModal
        client={client}
        show={show}
        isAdmin={isAdmin}
        onClose={close}
      />
    </>
  );
}
