// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { InputList } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter } from "@/components/modal";
import { Client } from "@/models/client";
import { useState } from "react";

type AddCustomScopeModalProps = {
  client: Client;
  show: boolean;
  onClose: () => void;
};

export function AddCustomScopeModal(props: Readonly<AddCustomScopeModalProps>) {
  const { show, onClose } = props;
  return (
    <Modal show={show} onClose={onClose} title="Add custom scope">
      <Form>
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
          <Button className="btn-secondary">Add custom scopes</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

export function AddCustomScope(props: Readonly<{ client: Client }>) {
  const { client } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-secondary" onClick={open}>
        Add custom scope
      </Button>
      <AddCustomScopeModal show={show} onClose={close} client={client} />
    </>
  );
}
