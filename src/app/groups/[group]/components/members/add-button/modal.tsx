// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Group } from "@/models/groups";
import { User } from "@/models/scim";
import { addUserToGroup } from "@/services/groups";
import { SearchUsers } from "@/app/components/search-users";
import { useState } from "react";

interface AddMemberModalProps extends ModalProps {
  group: Group;
}

export default function AddMemberModal(props: Readonly<AddMemberModalProps>) {
  const { group, onClose, ...modalProps } = props;
  const [selectedUser, setSelectedUser] = useState<User>();

  const clearAndClose = () => {
    props.onClose();
    setTimeout(() => setSelectedUser(undefined), 500);
  };

  const addMember = async () => {
    if (selectedUser?.id) {
      await addUserToGroup(group.id, selectedUser);
      clearAndClose();
    }
  };

  return (
    <Modal onClose={clearAndClose} {...modalProps} title="Add Member to Group">
      <ModalBody>
        <div className="space-y-4" hidden={!!selectedUser}>
          <p>Type to search for an user</p>
          <SearchUsers onSelect={setSelectedUser} />
        </div>
        <div className="space-y-4" hidden={!selectedUser}>
          <p>
            Are you sure you want to add too group the following user to group{" "}
            <b>{group.displayName}</b>?
          </p>
          <ul className="flex flex-col">
            <li className="inline-flex gap-1">
              <span className="font-bold">Name:</span>
              <span>{selectedUser?.name?.formatted}</span>
            </li>
            <li className="inline-flex gap-1">
              <span className="font-bold">Username:</span>
              <span>{selectedUser?.userName}</span>
            </li>
          </ul>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button className="btn-tertiary" type="button" onClick={clearAndClose}>
          Cancel
        </Button>
        <Button className="btn-primary" type="submit" onClick={addMember}>
          Add Member
        </Button>
      </ModalFooter>
    </Modal>
  );
}
