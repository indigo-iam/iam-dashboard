// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/buttons";
import { ModalProps } from "@/components/modal";
import ConfirmModal from "@/components/confirm-modal";
import { Field } from "@/components/form";
import { revokeTokens } from "@/services/clients";
import { toast } from "@/components/toaster";

type ConfirmModalProps = ModalProps & {
  clientId: string;
  clientName: string;
};

function Modal(props: Readonly<ConfirmModalProps>) {
  const { show, onClose, clientId, clientName } = props;
  const formRef = useRef<HTMLFormElement>(null);

  async function action() {
    if (!formRef.current) {
      console.warn("formRef is null");
      return;
    }
    const formData = new FormData(formRef.current);
    const tokensType = formData.get("token-type");
    if (tokensType === "access-token") {
      const res = await revokeTokens(clientId, "revoke-access-tokens");
      toast.toast(res);
    } else if (tokensType === "refresh-token") {
      const res = await revokeTokens(clientId, "revoke-refresh-tokens");
      toast.toast(res);
    }
  }

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      title={`Revoke tokens for client '${clientName}'?`}
      onConfirm={action}
      formRef={formRef}
      danger
    >
      <p>Select a type of tokens to revoke:</p>
      <div className="space-y-2 p-2 px-4">
        <Field className="flex items-center gap-2">
          <input
            type="radio"
            id="access-tokens"
            name="token-type"
            value="access-token"
            defaultChecked={true}
          />
          <label htmlFor="access-tokens">Access tokens</label>
        </Field>
        <Field className="flex items-center gap-2">
          <input
            type="radio"
            id="refresh-tokens"
            name="token-type"
            value="refresh-token"
          />
          <label htmlFor="refresh-tokens">
            Revoke refresh tokens and related access tokens
          </label>
        </Field>
      </div>
    </ConfirmModal>
  );
}

type RevokeTokensButtonProps = {
  clientId: string;
  clientName: string;
};

export function RevokeTokensButton(props: Readonly<RevokeTokensButtonProps>) {
  const { clientId, clientName } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-danger-secondary" onClick={open}>
        Revoke tokens
      </Button>
      <Modal
        show={show}
        onClose={close}
        clientId={clientId}
        clientName={clientName}
      />
    </>
  );
}
