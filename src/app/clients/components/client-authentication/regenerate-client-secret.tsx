// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Description, Field, Label } from "@/components/form";
import { InputSecret } from "@/app/components/input-secret";
import { regenerateClientSecret } from "@/services/clients";
import ConfirmModal from "@/components/confirm-modal";
import { useState } from "react";

export function RegenerateClientSecret(props: Readonly<{ clientId: string }>) {
  const { clientId } = props;
  const [secretValue, setSecretValue] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [displaySecret, setDisplaySecret] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  const action = async () => {
    await regenerateClientSecret(clientId).then((newSecret) => {
      setSecretValue(newSecret);
      setDisplaySecret(true);
    }).catch((err) => {
      console.error("Error regenerating client secret:", err);
    });
  };

  const showClientSecret = () => {
    if (secretValue && displaySecret) {
      return (
        <div className="mt-4">
          <div className="max-w-80 bg-gray-100 dark:bg-gray-800 rounded">
            <InputSecret secretValue={secretValue} >
            </InputSecret>
          </div>
        </div>
      );
    }
  }

  return (
    <Field>
      <Label>Regenerate Client Secret</Label>
      <Description>Generate a new secret for this client</Description>
      <Button className="btn-secondary" onClick={open}>Regenerate Secret</Button>
      <ConfirmModal
        show={show}
        onClose={close}
        onConfirm={action}
        danger
        title="Regenerate Client Secret"
      >
        Are you sure you want to regenerate the client secret? The previous secret will no longer be valid.
      </ConfirmModal>
      {showClientSecret()}
    </Field>
  );
}
