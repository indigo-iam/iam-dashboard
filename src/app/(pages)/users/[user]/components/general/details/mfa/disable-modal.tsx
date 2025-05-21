// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: Apache-2.0

import { Button } from "@/components/buttons";
import { Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter } from "@/components/modal";
import { disableMFA } from "@/services/users";

type DisableMFAModalProps = {
  show: boolean;
  onClose: () => void;
};

export function DisableMFAModal(props: Readonly<DisableMFAModalProps>) {
  const { show, onClose } = props;

  async function action(formData: FormData) {
    await disableMFA(formData);
    onClose();
  }

  return (
    <Modal show={show} onClose={onClose} title="Disable MFA">
      <Form action={action}>
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
