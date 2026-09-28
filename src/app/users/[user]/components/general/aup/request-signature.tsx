// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { Note } from "@/components/notices";
import { toast } from "@/components/toaster";
import { AUP } from "@/models/aup";
import { requestAUPSignature, signAUP } from "@/services/users";
import { useState } from "react";

type RequestSignatureProps = {
  userId: string;
  userFormattedName: string;
  isMe?: boolean;
  aup?: AUP;
};

export function RequestSignature(props: Readonly<RequestSignatureProps>) {
  const { userId, userFormattedName, isMe, aup } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  const handleSignAUP = async () => {
    const res = await signAUP(userId);
    toast.toast(res);
  };

  const handleRequestAUPSignature = async () => {
    const res = await requestAUPSignature(userId);
    toast.toast(res);
  };

  if (isMe) {
    return (
      <>
        <ConfirmModal
          show={show}
          onConfirm={handleSignAUP}
          onClose={close}
          title="Re-sign Acceptable Usage Policy"
        >
          <p>Do you want to re-sign the Acceptable Usage Policy?</p>
          <Note>
            By clicking <b>Confirm</b> you declare that you have read and accept
            this organization{" "}
            <a
              href={aup?.url}
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              Acceptable Usage Policy (AUP).
            </a>
          </Note>
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
        Are you sure you want to ask the user <b>{userFormattedName}</b> to sign
        the AUP?
      </ConfirmModal>
      <Button className="btn-secondary max-w-fit" onClick={open}>
        Request AUP Signature
      </Button>
    </>
  );
}
