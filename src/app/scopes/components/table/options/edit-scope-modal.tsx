// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Form } from "@/components/form";
import { Field } from "@/components/field";
import { Label } from "@/components/label";
import { Input } from "@/components/inputs";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "@/components/modal";
import { Scope } from "@/models/client";
import { editScope } from "@/services/scopes";
import { Button } from "@/components/buttons";
import { useToaster } from "@/components/toaster";

interface EditScopeModalProps extends ModalProps {
  scope: Scope;
}

export default function EditScopeModal(props: Readonly<EditScopeModalProps>) {
  const { scope, show, onClose } = props;
  const { toast } = useToaster();

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const description =
      (formData.get("description") as string) ?? scope.description;
    const value = (formData.get("value") as string) ?? scope.value;
    const newScope = { ...scope, description, value };
    const res = await editScope(newScope);
    toast(res);
    onClose?.();
  }

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Edit scope</ModalHeader>
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
          <Button variant="underline" type="reset" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save scope</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
