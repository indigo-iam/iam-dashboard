// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { useState } from "react";

import { Button } from "@/components/buttons";
import { Checkbox } from "@/components/checkbox";
import { Form } from "@/components/form";
import { Field } from "@/components/field";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/modal";
import { toast } from "@/components/toaster";
import { Client, Scope } from "@/models/client";
import { editClient } from "@/services/clients";
import { Label } from "@/components/label";

type ScopeCheckboxProps = {
  value: string;
  description: string;
  title?: string;
  disabled?: boolean;
};

function ScopeCheckbox(props: Readonly<ScopeCheckboxProps>) {
  const { value, description, title, disabled } = props;
  return (
    <Field
      role="listitem"
      className="group flex flex-row items-center gap-2 p-2 text-gray-600 hover:rounded-md hover:bg-gray-50 data-disabled:cursor-not-allowed data-disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-gray-400 dark:data-disabled:text-white/40"
      data-disabled={disabled || null}
    >
      <Checkbox name="scope" value={value} disabled={disabled} />
      <div className="flex grow flex-col">
        <Label>{title ?? value}</Label>
        <p className="text-sm font-light">{description}</p>
      </div>
    </Field>
  );
}

type AddScopeProps = {
  client: Client;
  isAdmin: boolean;
  availableScopes: Scope[];
};

type AddScopeModalProps = AddScopeProps & {
  show: boolean;
  onClose: () => void;
};

function AddScopeModal(props: Readonly<AddScopeModalProps>) {
  const { client, availableScopes, show, onClose, isAdmin } = props;

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newScope = formData.getAll("scope") as string[];
    const scopes = (client.scope?.split(" ") ?? []).concat(newScope);
    const scope = scopes.join(" ");
    const res = await editClient({ ...client, scope }, isAdmin);
    toast.toast(res);
    onClose();
  }

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Add system scopes</ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody className="p-0">
          <ul>
            {availableScopes.map(s => (
              <ScopeCheckbox
                key={s.id}
                value={s.value}
                description={s.description}
                title={s.restricted ? `${s.value} (restricted)` : s.value}
                disabled={s.restricted && !isAdmin}
              />
            ))}
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button variant="underline" onClick={onClose} type="reset">
            Cancel
          </Button>
          <Button type="submit">Add scope(s)</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

export function AddScopeButton(props: Readonly<AddScopeProps>) {
  const { client, isAdmin, availableScopes } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button variant="outline" type="button" onClick={open}>
        Add system scope(s)
      </Button>
      <AddScopeModal
        show={show}
        onClose={close}
        client={client}
        isAdmin={isAdmin}
        availableScopes={availableScopes}
      />
    </>
  );
}
