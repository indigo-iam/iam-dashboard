"use client";
import { Button } from "@/components/Buttons";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import SearchUser from "@/components/SearchUser";
import { Group } from "@/models/groups";
import { ScimReference, ScimUser } from "@/models/scim";
import { addUserToGroup } from "@/services/groups";
import { useState } from "react";

interface AddMemberModalProps extends ModalProps {
  group: Group;
}

export default function AddMemberModal(props: Readonly<AddMemberModalProps>) {
  const { group, ...modalProps } = props;
  const [selectedUser, setSelectedUser] = useState<ScimUser | null>(null);
  const selectUser = (user: ScimUser) => {
    setSelectedUser(user);
  };

  const clearAndClose = () => {
    props.onClose();
    setTimeout(() => setSelectedUser(null), 500);
  };

  const action = async () => {
    if (selectedUser?.id) {
      const userRef: ScimReference = {
        $ref: "",
        display: selectedUser.userName!,
        value: selectedUser.id,
      };
      await addUserToGroup(group.id, userRef);
      clearAndClose();
    }
  };

  return (
    <Modal {...modalProps}>
      <ModalBody>
        <SearchUser onSelected={selectUser} hidden={!!selectedUser} />
        <div hidden={!selectedUser}>
          <p>Selected user: </p>
          <b>Name</b>
          <p>{selectedUser?.name?.formatted}</p>
          <b>Username</b>
          <p>{selectedUser?.userName}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button type="button" action="danger" onClick={clearAndClose}>
          Cancel
        </Button>
        <form action={action}>
          <Button type="submit">Add Group Member</Button>
        </form>
      </ModalFooter>
    </Modal>
  );
}
