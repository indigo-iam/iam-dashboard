// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/modal";
import { toast } from "@/components/toaster";
import { disableMFA } from "@/services/users";

type DisableMFAModalProps = {
  show: boolean;
  onClose: () => void;
};

export function DisableMFAModal(props: Readonly<DisableMFAModalProps>) {
  const { show, onClose } = props;

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await disableMFA(formData);
    toast.toast(res);
    onClose();
  }

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader onClose={onClose}>Disable MFA</ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody>
          <p>
            This action disables multi-factor authentication on this account
            through your authenticator.
          </p>
          <p>
            This could leave your account vulnerable and may restrict access to
            some IAM services.
          </p>
          <p>To continue, please enter a TOTP from your authenticator.</p>
          <Label data-required>TOTP</Label>
          <Input name="code" />
        </ModalBody>
        <ModalFooter>
          <Button className="btn-tertiary" type="reset" onClick={onClose}>
            Cancel
          </Button>
          <Button className="btn-primary" type="submit">
            Disable MFA
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
