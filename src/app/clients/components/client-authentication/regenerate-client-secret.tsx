// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { InputSecret } from "@/app/components/input-secret";
import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { Description, Field, Label } from "@/components/form";
import { regenerateClientSecret } from "@/services/clients";
import { useState } from "react";

export function RegenerateClientSecret(props: Readonly<{ clientId: string }>) {
  const { clientId } = props;
  const [secret, setSecret] = useState<string | undefined>();
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  const action = async () => {
    const secret = await regenerateClientSecret(clientId);
    setSecret(secret);
  };

  function showClientSecret(secretValue: string) {
    return (
      <div className="mt-4">
        <div className="max-w-80 rounded bg-gray-100 dark:bg-gray-800">
          <InputSecret secretValue={secretValue} />
        </div>
      </div>
    );
  }

  return (
    <Field>
      <Label>Regenerate Client Secret</Label>
      <Description>Generate a new secret for this client</Description>
      <Button className="btn-secondary" onClick={open}>
        Regenerate Secret
      </Button>
      <ConfirmModal
        show={show}
        onClose={close}
        onConfirm={action}
        danger
        title="Regenerate Client Secret"
      >
        Are you sure you want to regenerate the client secret? The previous
        secret will no longer be valid.
      </ConfirmModal>
      {!!secret && showClientSecret(secret)}
    </Field>
  );
}
