// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@/components/modal";
import { toast } from "@/components/toaster";
import { addUserLabel } from "@/services/users";

type AddLabelModalProps = ModalProps & {
  userId: string;
};

function AddLabelModal(props: Readonly<AddLabelModalProps>) {
  const { userId, show, onClose } = props;
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const prefix = (formData.get("prefix") as string | null) ?? "";
    const name = (formData.get("name") as string | null) ?? "";
    const res = await addUserLabel(userId, prefix, name);
    console.log("culo?");
    if (res) {
      toast.toast(res);
    }
    onClose();
  }
  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader onClose={onClose}>Add user label</ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody>
          <Field>
            <Label>Prefix</Label>
            <Input name="prefix" required />
          </Field>
          <Field>
            <Label>Name</Label>
            <Input name="name" required />
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-tertiary" type="reset">
            Reset
          </Button>
          <Button className="btn-secondary" type="submit">
            Add label
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

type AddLabelButtonProps = {
  userId: string;
};

export function AddLabelButton(props: Readonly<AddLabelButtonProps>) {
  const { userId } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-secondary" onClick={open}>
        Add label
      </Button>
      <AddLabelModal userId={userId} show={show} onClose={close} />
    </>
  );
}
