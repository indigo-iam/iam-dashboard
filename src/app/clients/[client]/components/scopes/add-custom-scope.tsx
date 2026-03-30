// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { InputList } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter } from "@/components/modal";
import { Client } from "@/models/client";
import { editClient } from "@/services/clients";
import { useState } from "react";

type AddCustomScopeModalProps = {
  client: Client;
  isAdmin: boolean;
  show: boolean;
  onClose: () => void;
};

export function AddCustomScopeModal(props: Readonly<AddCustomScopeModalProps>) {
  const { client, isAdmin, show, onClose } = props;
  const action = async (formData: FormData) => {
    const newScope = formData.getAll("scope") as string[];
    const scopes = (client.scope?.split(" ") ?? []).concat(newScope);
    const scope = scopes.join(" ");
    await editClient({ ...client, scope }, isAdmin);
    onClose();
  };
  return (
    <Modal show={show} onClose={onClose} title="New custom scope">
      <Form action={action}>
        <ModalBody>
          <Field>
            <Label>Enter one or more scope</Label>
            <InputList
              id="scope"
              name="scope"
              placeholder="Enter a custom scope..."
              originalItems={[]}
            />
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-tertiary" type="reset" onClick={onClose}>
            Cancel
          </Button>
          <Button className="btn-primary" type="submit">
            New custom scopes
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

type AddCustomScopeProps = {
  client: Client;
  isAdmin: boolean;
};

export function AddCustomScope(props: Readonly<AddCustomScopeProps>) {
  const { client, isAdmin } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-secondary" onClick={open}>
        New custom scope
      </Button>
      <AddCustomScopeModal
        show={show}
        onClose={close}
        client={client}
        isAdmin={isAdmin}
      />
    </>
  );
}
