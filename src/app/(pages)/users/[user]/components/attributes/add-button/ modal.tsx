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
    <Modal {...modalProps} title={`Set an attribute for user ${username}`}>
      <Form action={action}>
        <ModalBody>
          <div className="flex flex-row gap-2">
            <b>User</b>
            {username}
          </div>
          <Field>
            <Label> Attribute Name</Label>
            <Input
              id="attr-name"
              title="Attribute Name"
              name="attr-name"
              placeholder="Attribute Name..."
              required
            />
          </Field>
          <Field>
            <Label>Attribute Value</Label>
            <Input
              id="attr-value"
              title="Attribute Value"
              name="attr-value"
              placeholder="Attribute Value..."
              required
            />
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button action="danger" type="button" onClick={modalProps.onClose}>
            Cancel
          </Button>
          <Button action="primary-outline" type="reset">
            Reset
          </Button>
          <Button action="primary" type="submit">
            Add Attribute
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
