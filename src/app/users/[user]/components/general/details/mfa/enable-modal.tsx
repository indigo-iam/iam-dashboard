// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import Image from "next/image";
import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter } from "@/components/modal";
import { AddSecretResponse } from "@/models/mfa";
import { addMFASecret, enableMFA } from "@/services/users";
import { toaster } from "@/components/toaster";
import { useEffect, useState } from "react";

type MFAModalProps = {
  show: boolean;
  onClose: () => void;
};

export function EnableMFAModal(props: Readonly<MFAModalProps>) {
  const { show, onClose } = props;
  const [mfa, setMfa] = useState<AddSecretResponse>();

  async function action(formData: FormData) {
    const response = await enableMFA(formData);
    if (response?.error) {
      const { message, status } = response.error;
      toaster.error("Cannot enable MFA", `${message}, status: ${status}`);
    } else {
      onClose();
    }
  }

  useEffect(() => {
    if (!show) {
      return;
    }
    const f = async () => {
      const response = await addMFASecret();
      if (response.result) {
        setMfa(response.result);
      }
      if (response.error) {
        const { message, status } = response.error;
        toaster.error("Cannot enable MFA", `${message}, status: ${status}`);
      }
    };
    f();
  }, [show]);

  return (
    <Modal show={show} onClose={onClose} title="Enable authenticator">
      <Form action={action}>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <p>
              Scan the QR code through your authenticator and input a TOTP to
              validate configuration.
            </p>
            {mfa?.dataUri ? (
              <Image
                className="m-auto"
                src={mfa.dataUri}
                alt="qr-code"
                width={320}
                height={320}
              />
            ) : (
              <div className="m-auto h-[320] w-[320] animate-pulse bg-gray-200 duration-75" />
            )}
            <p className="items-start">
              Alternatively, enter this secret manually into your authenticator.
            </p>
            {mfa?.secret ? (
              <span className="m-auto break-all">{mfa?.secret}</span>
            ) : (
              <div className="animation-pulse min-w-48 bg-gray-200" />
            )}
          </div>
          <Field>
            <Label data-required>TOTP</Label>
            <Input name="code" placeholder="Insert TOTP..." type="string" />
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-tertiary" type="reset" onClick={onClose}>
            Cancel
          </Button>
          <Button className="btn-primary" type="submit">
            Enable MFA
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
