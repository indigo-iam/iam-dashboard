// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { Button } from "@/components/buttons";
import Combobox from "@/components/combobox";
import InfoTable from "@/components/info-table";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Group } from "@/models/groups";
import { User } from "@/models/scim";
import { assignGroupManager } from "@/services/groups";
import { searchUser } from "@/services/users";
import { useState } from "react";

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
