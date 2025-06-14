// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Checkbox, Description, Field, Form, Label } from "@/components/form";
import { Modal, ModalBody, ModalFooter } from "@/components/modal";
import { Client, Scope } from "@/models/client";
import { editClient } from "@/services/clients";
import { useState } from "react";

type AddScopeProps = {
  client: Client;
  scopes: Scope[];
};

interface AddScopeModalProps extends AddScopeProps {
  show: boolean;
  onClose: () => void;
}

function AddScopeModal(props: Readonly<AddScopeModalProps>) {
  const { client, scopes, show, onClose } = props;
  const action = async (formData: FormData) => {
    const newScope = formData.getAll("scope") as string[];
    const scopes = (client.scope?.split(" ") ?? []).concat(newScope);
    const scope = scopes.join(" ");
    await editClient({ ...client, scope });
    onClose();
  };
  return (
    <Modal show={show} onClose={onClose} title="Add system scopes">
      <Form action={action}>
        <ModalBody className="p-0">
          <ul>
            {scopes.map(s => (
              <Field
                as="li"
                key={s.id}
                className="dark:border-light dark:hover:bg-neutral-200/10; flex flex-row items-center gap-2 px-2 hover:rounded-md hover:border-transparent hover:bg-neutral-200"
              >
                <Checkbox name="scope" value={s.value} />
                <div className="flex grow flex-col">
                  <Label>{s.value}</Label>
                  <Description>{s.description}</Description>
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
  const { client, scopes } = props;
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
        scopes={scopes}
      />
    </>
  );
}
