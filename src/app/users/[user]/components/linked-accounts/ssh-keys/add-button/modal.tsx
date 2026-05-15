// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Form, Field, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Textarea } from "@/components/textarea";
import { toaster } from "@/components/toaster";
import { SSHKey } from "@/models/indigo-user";
import { User } from "@/models/scim";
import { addSSHKey } from "@/services/users";

interface AddSSHKeyModalProps extends ModalProps {
  user: User;
}

export default function AddSSHKeyModal(props: Readonly<AddSSHKeyModalProps>) {
  const { user, ...modalProps } = props;

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const sshKey: SSHKey = {
      display: formData.get("ssh-label") as string,
      value: formData.get("ssh-key") as string,
    };
    const res = await addSSHKey(user.id, sshKey);
    toaster.send(res);
    modalProps.onClose();
  }

  return (
    <Modal {...modalProps} title="Add SSH Key">
      <Form onSubmit={submit}>
        <ModalBody>
          <Field>
            <Label>Label</Label>
            <Input
              id="ssh-label"
              name="ssh-label"
              required={true}
              placeholder="Type a label..."
            />
          </Field>
          <Field>
            <Label>SSH Key</Label>
            <Textarea
              id="ssh-key"
              name="ssh-key"
              title="SSH Key"
              className="iam-input w-full"
              placeholder="SSH Key..."
              required={true}
            />
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-tertiary"
            type="reset"
            onClick={modalProps.onClose}
          >
            Cancel
          </Button>
          <Button className="btn-secondary" type="reset">
            Reset Form
          </Button>
          <Button className="btn-primary" type="submit">
            Add SSH Key
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
