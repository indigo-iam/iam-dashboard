// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { User } from "@/models/scim";
import { requestAUPSignature } from "@/services/users";
import { useState } from "react";

type RequestSignatureProps = {
  user: User;
  isMe?: boolean;
};

export function RequestSignature(props: Readonly<RequestSignatureProps>) {
  const { user, isMe } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  const action = async () => {
    await requestAUPSignature(user.id);
  };

  if (isMe) {
    return (
      <form className="flex justify-end" action={action}>
        <Button className="btn-secondary" type="submit">
          Re-sign AUP
        </Button>
      </form>
    );
  }

  return (
    <>
      <ConfirmModal
        show={show}
        onConfirm={action}
        onClose={close}
        title="Request AUP signature"
      >
        Are you sure you want to ask the user{" "}
        <span className="font-bold">{user.name?.formatted}</span> to sign the
        AUP?
      </ConfirmModal>
      <Button className="btn-secondary" onClick={open}>
        Request AUP Signature
      </Button>
    </>
  );
}
