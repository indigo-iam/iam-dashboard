// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter } from "@/components/modal";
import { addGroup } from "@/services/groups";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type AddGroupFormProps = {
  onClose?: () => void;
  onGroupAdded?: () => void;
};
function AddGroupForm(props: Readonly<AddGroupFormProps>) {
  const { onClose, onGroupAdded } = props;

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("groupName") as string;
    await addGroup(name);
    onClose?.();
    onGroupAdded?.();
  };
  return (
    <Form id="add-root-group-form" action={handleSubmit}>
      <ModalBody>
        <Input
          type="text"
          name="groupName"
          title="Name"
          placeholder="Insert group name..."
          required
        />
      </ModalBody>
      <ModalFooter>
        <Button className="btn-tertiary" type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button className="btn-secondary" type="reset">
          Reset
        </Button>
        <Button className="btn-primary" type="submit">
          Add Root Group
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
      <Modal show={show} onClose={close} title="Add Group" data-testid="modal">
        <AddGroupForm onClose={close} onGroupAdded={onGroupAdded} />
      </Modal>
      <Button className="btn-secondary" data-testid="add-group" onClick={open}>
        <PlusIcon className="my-auto size-5" />
        Add Group
      </Button>
    </>
  );
}
