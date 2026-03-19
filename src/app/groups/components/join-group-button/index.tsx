// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/buttons";
import { Form,} from "@/components/form";
import { Modal, ModalBody, ModalFooter } from "@/components/modal";

type JoinGroupModalProps = {
  show: boolean;
  onClose?: () => void;
};
function JoinGroupModal(props: Readonly<JoinGroupModalProps>) {
  const { show, onClose } = props;
  const action = async (formData: FormData) => {};
  return (
    <Modal
      show={show}
      onClose={close}
      title="Create new group"
      data-testid="modal"
    >
      <Form action={action}>
        <ModalBody></ModalBody>
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
    </Modal>
  );
}

type AddGroupButtonProps = {
  onGroupAdded?: () => void;
};

export default function AddGroupButton(props: Readonly<AddGroupButtonProps>) {
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-secondary" data-testid="add-group" onClick={open}>
        <PlusIcon className="size-4" />
        New group
      </Button>
      <JoinGroupModal show={show} onClose={close} />
    </>
  );
}
