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
        <Button type="submit">Add Root Group</Button>
        <Button type="reset">Reset</Button>
        <Button type="reset" onClick={onClose}>
          Cancel
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
      <Modal show={show} onClose={close} title="Add Group" data-test="modal">
        <AddGroupForm onClose={close} onGroupAdded={onGroupAdded} />
      </Modal>
      <Button
        data-test="add-group"
        action="primary-outline"
        icon={<PlusIcon />}
        onClick={open}
      >
        Add Group
      </Button>
    </>
  );
}
