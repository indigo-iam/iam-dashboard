// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { InputSecret } from "@/app/components/input-secret";
import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { Field, Label } from "@/components/form";
import { Info } from "@/components/info";
import { toast } from "@/components/toaster";
import { rotateClientSecret } from "@/services/clients";
import { useState } from "react";

type ClientSecretViewProps = {
  secret: string;
};

function ClientSecretView(props: Readonly<ClientSecretViewProps>) {
  const { secret } = props;
  return (
    <div className="mt-4 max-w-80 rounded bg-gray-100 dark:bg-gray-800">
      <InputSecret value={secret} />
    </div>
  );
}

type RotateClientSecretProps = {
  clientId: string;
};

export function RotateClientSecret(props: Readonly<RotateClientSecretProps>) {
  const { clientId } = props;
  const [secret, setSecret] = useState<string>();
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  const action = async () => {
    const response = await rotateClientSecret(clientId);
    if (typeof response === "object") {
      toast.toast(response);
    } else {
      setSecret(response);
    }
  };

  return (
    <Field>
      <div className="flex items-center gap-2">
        <Label>Generate a new secret for this client</Label>
        <Info anchor="left" className="pb-1.5">
          Clients secrets provides authentication for this client.
        </Info>
      </div>
      <Button className="btn-secondary" onClick={open}>
        Rotate Secret
      </Button>
      <ConfirmModal
        show={show}
        onClose={close}
        onConfirm={action}
        danger
        title="Rotate Client Secret"
      >
        Are you sure you want to rotate the client secret? The previous secret
        will no longer be valid.
      </ConfirmModal>
      {secret && <ClientSecretView secret={secret} />}
    </Field>
  );
}
