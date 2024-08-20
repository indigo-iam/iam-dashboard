"use client";
import { Button } from "@/components/Buttons";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import SearchUser from "@/components/SearchUser";
import { Group } from "@/models/groups";
import { ScimReference, ScimUser } from "@/models/scim";
import { useState } from "react";
import getConfig from "@/utils/config";

const { BASE_URL } = getConfig();

interface LinkUserModalProps extends ModalProps {
  group: Group;
  action: (groupId: string, userRef: ScimReference) => Promise<void>;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export default function LinkUserModal(props: Readonly<LinkUserModalProps>) {
  const { group, action, confirmButtonText, cancelButtonText, ...modalProps } =
    props;

  const [selectedUser, setSelectedUser] = useState<ScimUser | null>(null);
  const selectUser = (user: ScimUser) => {
    setSelectedUser(user);
  };

  const clearAndClose = () => {
    props.onClose();
    setTimeout(() => setSelectedUser(null), 500);
  };

  const fromAction = async () => {
    if (selectedUser?.id) {
      const userRef: ScimReference = {
        $ref: `${BASE_URL}/scim/Users/${selectedUser.id!}`,
        display: selectedUser.userName!,
        value: selectedUser.id,
      };
      await action(group.id, userRef);
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
          {cancelButtonText}
        </Button>
        <form action={fromAction}>
          <Button type="submit">{confirmButtonText}</Button>
        </form>
      </ModalFooter>
    </Modal>
  );
}
