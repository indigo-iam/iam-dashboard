// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { PlusIcon } from "@heroicons/react/16/solid";

import { Button } from "@/components/buttons";
import { Form, Description, Field, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "@/components/modal";
import { Option, Select } from "@/components/select";
import { toast } from "@/components/toaster";
import { addScope } from "@/services/scopes";

type NewScopeModalProps = ModalProps;

export default function NewScopeModal(props: Readonly<NewScopeModalProps>) {
  const { show, onClose } = props;
  const options = [
    { id: "none", name: "None" },
    { id: "default", name: "Default" },
    { id: "restricted", name: "Restricted" },
  ];
  const defaultScopeType = options[0].id;

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.get("value") as string;
    const description = formData.get("description") as string;
    const scopeType = formData.get("scope-type") as string;
    const defaultScope = scopeType === "default";
    const restricted = scopeType === "restricted";
    const icon = "";
    const res = await addScope({
      value,
      description,
      defaultScope,
      restricted,
      icon,
    });
    toast.toast(res);
    onClose();
  }

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Add new system scope</ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody className="space-y-4 pb-4">
          <p>
            System scopes are available to all clients. <b>Default</b> scopes
            are enabled by default to all new clients while <b>Restricted</b>{" "}
            scopes can be only enabled by administrators.
          </p>
          <Field>
            <Label>Scope</Label>
            <Input id="scope" name="value" placeholder="Scope name" />
            <Description>Single string with no spaces.</Description>
          </Field>
          <Field>
            <Label>Description</Label>
            <Input
              id="scope"
              name="description"
              placeholder="Scope description"
            />
            <Description>Single string with no spaces.</Description>
          </Field>
          <Field>
            <Label>Scope Type</Label>
            <Select name="scope-type" defaultValue={defaultScopeType}>
              {options.map(option => (
                <Option key={option.id} value={option.id}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button variant="underline" type="reset" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" type="reset">
            Reset
          </Button>
          <Button type="submit">
            <PlusIcon className="my-auto size-5" />
            Add Scope
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
