// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { Button } from "@/components/buttons";
import Combobox from "@/components/combobox";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { User } from "@/models/scim";
import { searchUser } from "@/services/users";
import { useState } from "react";

interface AssignOwnerModal extends ModalProps {}

export default function AssignOwnerModal(props: Readonly<AssignOwnerModal>) {
  const [selectedUser, setSelectedUser] = useState<User>();
  const addOwner = (user: User) => {
    setSelectedUser(user);
  };

  const clearAndClose = () => {
    setSelectedUser(undefined);
    props?.onClose();
  };

  return (
    <Modal {...props}>
      <ModalBody>
        <Combobox
          onSelected={addOwner}
          searchCallback={searchUser}
        />
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
