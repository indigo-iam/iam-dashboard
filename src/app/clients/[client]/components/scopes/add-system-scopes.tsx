// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Checkbox, Field, Form } from "@/components/form";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/modal";
import { toast } from "@/components/toaster";
import { Client, Scope } from "@/models/client";
import { editClient } from "@/services/clients";
import { useState } from "react";

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
      <ModalHeader onClose={onClose}>Add system scopes</ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody className="p-0">
          <ul>
            {availableScopes.map(s => (
              <Field
                as="li"
                key={s.id}
                className="dark:hover:bg-neutral-200/10; flex flex-row items-center gap-2 p-2 hover:rounded-md hover:bg-neutral-200"
              >
                <Checkbox name="scope" value={s.value} />
                <div className="flex grow flex-col">
                  <p className="text-gray-500 dark:text-white/70">{s.value}</p>
                  <p className="text-sm font-light text-gray-500 dark:text-white/70">
                    {s.description}
                  </p>
                </div>
              </Field>
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

export function AddScopeButton(props: AddScopeProps) {
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
