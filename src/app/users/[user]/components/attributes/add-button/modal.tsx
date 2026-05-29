// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Form, Field, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "@/components/modal";
import { toast } from "@/components/toaster";
import { User } from "@/models/scim";
import { addAttribute } from "@/services/users";

interface AddAttributeModalProps extends ModalProps {
  user: User;
}

export default function AddAttributeModal(
  props: Readonly<AddAttributeModalProps>
) {
  const { user, ...modalProps } = props;
  const username = user.name?.formatted ?? "unknown user";

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("attr-name") as string;
    const value = formData.get("attr-value") as string;
    const res = await addAttribute(user.id, { name, value });
    toast.toast(res);
    modalProps.onClose();
  }

  return (
    <Modal {...modalProps}>
      <ModalHeader onClose={modalProps.onClose}>Add user attribute</ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody>
          <Field>
            <Label>Username</Label>
            <Input defaultValue={username} disabled />
          </Field>
          <Field>
            <Label data-required>Name</Label>
            <Input
              id="attr-name"
              title="Attribute Name"
              name="attr-name"
              placeholder="Attribute name"
              required
            />
          </Field>
          <Field>
            <Label data-required>Value</Label>
            <Input
              id="attr-value"
              title="Attribute Value"
              name="attr-value"
              placeholder="Attribute value"
              required
            />
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-tertiary"
            type="button"
            onClick={modalProps.onClose}
          >
            Cancel
          </Button>
          <Button className="btn-secondary" type="reset">
            Reset
          </Button>
          <Button className="btn-primary" type="submit">
            Add Attribute
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
