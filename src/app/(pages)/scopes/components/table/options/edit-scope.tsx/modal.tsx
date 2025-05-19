// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Scope } from "@/models/client";
import { editScope } from "@/services/scopes";
import { Button } from "@headlessui/react";

interface EditScopeModalProps extends ModalProps {
  scope: Scope;
}

export function EditScopeModal(props: Readonly<EditScopeModalProps>) {
  const { scope, show, onClose } = props;

  const action = async (formData: FormData) => {
    const description =
      (formData.get("description") as string) ?? scope.description;
    const value = (formData.get("value") as string) ?? scope.value;
    const newScope = { ...scope, description, value };
    await editScope(newScope);
    onClose?.();
  };

  return (
    <Modal title="Edit Scope" show={show} onClose={onClose}>
      <Form action={action}>
        <ModalBody>
          <Field>
            <Label>Scope Name</Label>
            <Input name="value" defaultValue={scope.value} />
          </Field>
          <Field>
            <Label>Scope Description</Label>
            <Input name="description" defaultValue={scope.description} />
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-tertiary" type="reset" onClick={onClose}>
            Cancel
          </Button>
          <Button className="btn-primary" type="submit">
            Save scope
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
