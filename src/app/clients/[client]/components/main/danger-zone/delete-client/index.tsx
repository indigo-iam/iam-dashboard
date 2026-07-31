// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Button } from "@/components/buttons";
import DeleteClientModal from "./modal";

type DeleteButtonProps = {
  clientId: string;
  clientName: string;
  clientDescription: string | null;
  isAdmin: boolean;
};

export function DeleteButton(props: Readonly<DeleteButtonProps>) {
  const { clientId, clientName, clientDescription, isAdmin } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-danger" onClick={open}>
        Delete
      </Button>
      <DeleteClientModal
        clientId={clientId}
        clientName={clientName}
        clientDescription={clientDescription}
        show={show}
        isAdmin={isAdmin}
        onClose={close}
      />
    </>
  );
}
