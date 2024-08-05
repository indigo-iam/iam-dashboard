"use client";
import Button from "@/components/Button";
import { Form } from "@/components/Form";
import Input from "@/components/Input";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import { addRootGroup } from "@/services/groups";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type AddRootGroupFormProps = {
  onClose?: () => void;
  onRootGroupAdded?: () => void;
};
function AddRootGroupForm(props: Readonly<AddRootGroupFormProps>) {
  const { onClose, onRootGroupAdded } = props;

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("groupName") as string;
    await addRootGroup(name);
    onClose?.();
    onRootGroupAdded?.();
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

interface AddRootGroupModalProps extends ModalProps {
  onRootGroupAdded?: () => void;
}
function AddRootGroupModal(props: Readonly<AddRootGroupModalProps>) {
  const { onRootGroupAdded, ...modalProps } = props;
  return (
    <Modal {...modalProps}>
      <AddRootGroupForm
        onClose={modalProps.onClose}
        onRootGroupAdded={onRootGroupAdded}
      />
    </Modal>
  );
}

type AddRootGroupProps = {
  onRootGroupAdded?: () => void;
};
export default function AddRootGroup(props: Readonly<AddRootGroupProps>) {
  const { onRootGroupAdded } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <AddRootGroupModal
        show={show}
        onClose={close}
        title="Add Root Group"
        onRootGroupAdded={onRootGroupAdded}
      />
      <Button icon={<PlusIcon />} onClick={open}>
        Add Root Group
      </Button>
    </>
  );
}
