// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Scope } from "@/models/client";
import { editScope } from "@/services/scopes";
import { Button } from "@/components/buttons";
import { toast } from "@/components/toaster";

interface EditScopeModalProps extends ModalProps {
  scope: Scope;
}

export default function EditScopeModal(props: Readonly<EditScopeModalProps>) {
  const { scope, show, onClose } = props;

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const description =
      (formData.get("description") as string) ?? scope.description;
    const value = (formData.get("value") as string) ?? scope.value;
    const newScope = { ...scope, description, value };
    const res = await editScope(newScope);
    toast.toast(res);
    onClose?.();
  }

  return (
    <Modal title="Edit scope" show={show} onClose={onClose}>
      <Form onSubmit={submit}>
        <ModalBody>
          <Field>
            <Label>Scope name</Label>
            <Input name="value" defaultValue={scope.value} />
          </Field>
          <Field>
            <Label>Scope description</Label>
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
