// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { useState } from "react";
import { Label } from "@headlessui/react";

import { Button } from "@/components/buttons";
import { Checkbox, Field, Form } from "@/components/form";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/modal";
import { toast } from "@/components/toaster";
import { Client, Scope } from "@/models/client";
import { editClient } from "@/services/clients";

type ScopeCheckboxProps = {
  value: string;
  description: string;
};

function ScopeCheckbox(props: Readonly<ScopeCheckboxProps>) {
  const { value, description } = props;
  return (
    <Field
      as="li"
      className="flex flex-row items-center gap-2 p-2 hover:rounded-md hover:bg-gray-100 dark:hover:bg-gray-400"
    >
      <Checkbox name="scope" value={value} />
      <div className="flex grow flex-col">
        <Label className="text-gray-500 dark:text-white/70">{value}</Label>
        <p className="text-sm font-light text-gray-500 dark:text-white/70">
          {description}
        </p>
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
  const allowedScopes = availableScopes.filter(
    scope => !scope.restricted || isAdmin
  );

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
            {allowedScopes.map(s => (
              <ScopeCheckbox
                key={s.id}
                value={s.value}
                description={s.description}
              />
            ))}
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-tertiary" onClick={onClose} type="reset">
            Cancel
          </Button>
          <Button className="btn-primary" type="submit">
            Add scope(s)
          </Button>
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
      <Button className="btn-secondary" onClick={open}>
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
