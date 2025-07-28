// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { Form, Field, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
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

  const action = async (formData: FormData) => {
    const name = formData.get("attr-name") as string;
    const value = formData.get("attr-value") as string;
    await addAttribute(user.id, { name, value });
    modalProps.onClose();
  };

  return (
    <Modal {...modalProps} title="Add user attribute">
      <Form action={action}>
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
