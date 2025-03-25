"use client";
import { Button } from "@/components/buttons";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Group } from "@/models/groups";
import { User } from "@/models/scim";
import { useState } from "react";
import InfoTable from "@/components/info-table";
import { addUserToGroup } from "@/services/groups";
import { makeScimReferenceFromUser } from "@/utils/scim";
import Combobox from "@/components/combobox";
import { searchUser } from "@/services/users";

interface AddMemberModalProps extends ModalProps {
  group: Group;
}

export default function AddMemberModal(props: Readonly<AddMemberModalProps>) {
  const { group, onClose, ...modalProps } = props;
  const [selectedUser, setSelectedUser] = useState<User>();
  const selectUser = (user: User) => setSelectedUser(user);

  const clearAndClose = () => {
    props.onClose();
    setTimeout(() => setSelectedUser(undefined), 500);
  };

  const addMember = async () => {
    if (selectedUser?.id) {
      const userRef = makeScimReferenceFromUser(selectedUser);
      await addUserToGroup(group.id, userRef);
      clearAndClose();
    }
  };

  const data = [
    { name: "Name", value: selectedUser?.name?.formatted ?? "unknown user" },
    { name: "Username", value: selectedUser?.userName ?? "unknown username" },
  ];

  return (
    <Modal onClose={clearAndClose} {...modalProps} title="Add Member to Group">
      <ModalBody>
        <div className="space-y-4" hidden={!!selectedUser}>
          <p>Type to search for an user</p>
          <Combobox onSelected={selectUser} searchCallback={searchUser} />
        </div>
        <div className="space-y-4" hidden={!selectedUser}>
          <p>
            Are you sure you want to add too group the following user to group{" "}
            <b>{group.displayName}</b>?
          </p>
          <InfoTable data={data} />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button type="button" action="danger" onClick={clearAndClose}>
          Cancel
        </Button>
        <Button type="submit" action="primary-outline" onClick={addMember}>
          Add Member
        </Button>
      </ModalFooter>
    </Modal>
  );
}
