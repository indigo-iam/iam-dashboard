// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter } from "@/components/modal";
import { toaster } from "@/components/toaster";
import { addGroup } from "@/services/groups";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type AddGroupFormProps = {
  onClose?: () => void;
  onGroupAdded?: () => void;
};

function AddGroupForm(props: Readonly<AddGroupFormProps>) {
  const { onClose, onGroupAdded } = props;

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("groupName") as string;
    const res = await addGroup(name);
    toaster.send(res);
    onClose?.();
    onGroupAdded?.();
  }

  return (
    <Form id="add-root-group-form" onSubmit={submit}>
      <ModalBody>
        <Field className="mb-8">
          <Label data-required>Group Name</Label>
          <Input
            type="text"
            name="groupName"
            title="Name"
            placeholder="Group name"
            required
          />
        </Field>
      </ModalBody>
      <ModalFooter>
        <Button className="btn-tertiary" type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button className="btn-secondary" type="reset">
          Reset
        </Button>
        <Button className="btn-primary" type="submit">
          Add group
        </Button>
      </ModalFooter>
    </Form>
  );
}

type AddGroupButtonProps = {
  onGroupAdded?: () => void;
};

export default function AddGroupButton(props: Readonly<AddGroupButtonProps>) {
  const { onGroupAdded } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Modal
        show={show}
        onClose={close}
        title="Create new group"
      >
        <AddGroupForm onClose={close} onGroupAdded={onGroupAdded} />
      </Modal>
      <Button className="btn-secondary" data-testid="add-group" onClick={open}>
        <PlusIcon className="size-4" />
        New group
      </Button>
    </>
  );
}
