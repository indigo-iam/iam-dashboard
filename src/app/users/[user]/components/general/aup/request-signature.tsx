// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { AUP } from "@/models/aup";
import { User } from "@/models/scim";
import { requestAUPSignature, signAUP } from "@/services/users";
import { useState } from "react";

type RequestSignatureProps = {
  user: User;
  isMe?: boolean;
  aup?: AUP;
};

export function RequestSignature(props: Readonly<RequestSignatureProps>) {
  const { user, isMe, aup } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  const handleSignAUP = async () => {
    await signAUP(user.id);
  };

  const handleRequestAUPSignature = async () => {
    await requestAUPSignature(user.id);
  };

  if (isMe) {
    return (
      <>
        <ConfirmModal
          show={show}
          onConfirm={handleSignAUP}
          onClose={close}
          title="Re-sign AUP"
        >
          In order to proceed, you need to declare that you have read and that
          you accept the terms of this organization{" "}
          <a
            href={aup?.url}
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            Acceptable Usage Policy (AUP).
          </a>
        </ConfirmModal>
        <Button className="btn-secondary max-w-fit" onClick={open}>
          Re-sign AUP
        </Button>
      </>
    );
  }

  return (
    <>
      <ConfirmModal
        show={show}
        onConfirm={handleRequestAUPSignature}
        onClose={close}
        title="Request AUP signature"
      >
        Are you sure you want to ask the user{" "}
        <span className="font-bold">{user.name?.formatted}</span> to sign the
        AUP?
      </ConfirmModal>
      <Button className="btn-secondary max-w-fit" onClick={open}>
        Request AUP Signature
      </Button>
    </>
  );
}
