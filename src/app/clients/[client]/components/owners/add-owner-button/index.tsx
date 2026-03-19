// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Client } from "@/models/client";
import { AddOwnerModal } from "./modal";

import { useState } from "react";

type AddOwnerButtonProps = {
  client: Client;
};

export function AddOwnerButton(props: Readonly<AddOwnerButtonProps>) {
  const { client } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-secondary" onClick={open}>
        <div className="flex items-center gap-1">
          <PlusIcon className="size-4" />
          <span>Add owner</span>
        </div>
      </Button>
      <AddOwnerModal client={client} show={show} onClose={close} />
    </>
  );
}
