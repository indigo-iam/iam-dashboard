// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/buttons";
import { AddOwnerModal } from "./modal";

type AddOwnerButtonProps = {
  clientId: string;
  clientName: string;
  className?: string;
  variant?: "solid" | "outline";
};

export function AddOwnerButton(props: Readonly<AddOwnerButtonProps>) {
  const { clientId, clientName, className, variant = "solid" } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button
        variant={variant}
        className={className}
        type="button"
        onClick={open}
      >
        <PlusIcon className="size-4" />
        <span>Add owner</span>
      </Button>
      <AddOwnerModal
        clientId={clientId}
        clientName={clientName}
        show={show}
        onClose={close}
      />
    </>
  );
}
