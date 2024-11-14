"use client";
import { Button } from "@/components/Buttons";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import { Group } from "@/models/groups";
import { User } from "@/models/scim";
import { useState } from "react";
import InfoTable from "@/components/InfoTable";
import { assignGroupManager } from "@/services/groups";
import Combobox from "@/components/Combobox";
import { searchUser } from "@/services/users";

interface AssignGroupManagerModalProps extends ModalProps {
  group: Group;
}

export default function AssignGroupManagerModal(
  props: Readonly<AssignGroupManagerModalProps>
) {
  const { group, onClose, ...modalProps } = props;
  const [selectedUser, setSelectedUser] = useState<User>();
  const selectUser = (user: User) => setSelectedUser(user);

  const clearAndClose = () => {
    setTimeout(() => setSelectedUser(undefined), 500);
    onClose();
  };

  const assignManager = async () => {
    if (selectedUser?.id) {
      await assignGroupManager(group.id, selectedUser.id);
      clearAndClose();
    }
  };

  const data = [
    { name: "Name", value: selectedUser?.name?.formatted ?? "unknown user" },
    { name: "Username", value: selectedUser?.userName ?? "unknown username" },
  ];

  return (
    <Modal onClose={clearAndClose} {...modalProps} title="Assign Group Manager">
      <ModalBody>
        <div className="space-y-4" hidden={!!selectedUser}>
          <p>Type to search for an user</p>
          <Combobox onSelected={selectUser} searchCallback={searchUser} />
        </div>
        <div className="space-y-4" hidden={!selectedUser}>
          <p>
            Are you sure you want give manager privileges for group{" "}
            <b>{group.displayName}</b> to the following user?
          </p>
          <InfoTable data={data} />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button type="button" action="danger" onClick={clearAndClose}>
          Cancel
        </Button>
        <Button type="submit" onClick={assignManager}>
          Assign Group Manager
        </Button>
      </ModalFooter>
    </Modal>
  );
}
