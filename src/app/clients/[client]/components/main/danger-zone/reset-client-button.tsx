// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Button } from "@/components/buttons";
import { ModalProps } from "@/components/modal";
import ConfirmModal from "@/components/confirm-modal";
import { resetClient } from "@/services/clients";
import { toast } from "@/components/toaster";

type ConfirmModalProps = ModalProps & {
  clientId: string;
  clientName: string;
};

function Modal(props: Readonly<ConfirmModalProps>) {
  const { show, onClose, clientId, clientName } = props;

  async function action() {
    const res = await resetClient(clientId);
    toast.toast(res);
  }

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      title={`Revoke tokens for client '${clientName}'?`}
      onConfirm={action}
      danger
    >
      <p>
        {"Are you sure you want to reset the client "}
        <b>{clientName}</b>?
      </p>
      <p>Resetting the client will:</p>
      <ul className="list-disc px-4">
        <li>Revokes all the tokens created by the client</li>
        <li>Rotates the client secret</li>
      </ul>
    </ConfirmModal>
  );
}

type ResetClientButtonProps = {
  clientId: string;
  clientName: string;
};

export function ResetClientButton(props: Readonly<ResetClientButtonProps>) {
  const { clientId, clientName } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-danger-secondary" onClick={open}>
        Reset client
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
