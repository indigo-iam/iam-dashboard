"use client";
import { Button } from "@/components/Buttons";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import SearchUser from "@/components/SearchUser";
import { ScimUser } from "@/models/scim";
import { useState } from "react";

interface AssignOwnerModal extends ModalProps {}

export default function AssignOwnerModal(props: Readonly<AssignOwnerModal>) {
  const [selectedUser, setSelectedUser] = useState<ScimUser>();
  const addOwner = (user: ScimUser) => {
    setSelectedUser(user);
    console.log(user);
  };

  const clearAndClose = () => {
    setSelectedUser(undefined);
    props?.onClose();
  };

  return (
    <Modal {...props}>
      <ModalBody>
        <SearchUser onSelected={addOwner} hidden={!!selectedUser} />
        <div hidden={!selectedUser}>
          <p>Selected user: </p>
          <b>Name</b>
          <p>{selectedUser?.name?.formatted}</p>
          <b>Username</b>
          <p>{selectedUser?.userName}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button action="primary">Assign Owner</Button>
        <Button action="danger-outline" onClick={clearAndClose}>
          Cancel{" "}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
