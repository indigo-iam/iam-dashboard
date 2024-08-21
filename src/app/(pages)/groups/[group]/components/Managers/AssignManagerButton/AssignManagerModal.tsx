"use client";
import { Button } from "@/components/Buttons";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import SearchUser from "@/components/SearchUser";
import { Group } from "@/models/groups";
import { ScimUser } from "@/models/scim";
import { useState } from "react";
import InfoTable from "@/components/InfoTable";
import { assignGroupManager } from "@/services/groups";

interface AssignGroupManagerModalProps extends ModalProps {
  group: Group;
}

export default function AssignGroupManagerModal(
  props: Readonly<AssignGroupManagerModalProps>
) {
  const { group, ...modalProps } = props;
  const [selectedUser, setSelectedUser] = useState<ScimUser>();
  const selectUser = (user: ScimUser) => setSelectedUser(user);

  const clearAndClose = () => {
    props.onClose();
    setTimeout(() => setSelectedUser(undefined), 500);
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
    <Modal {...modalProps} title="Assign Group Manager">
      <ModalBody>
        <div className="space-y-4" hidden={!!selectedUser}>
          <p>Type to search for an user</p>
          <SearchUser onSelected={selectUser} />
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
