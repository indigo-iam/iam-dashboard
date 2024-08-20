"use client";
import { Button } from "@/components/Buttons";
import { useState } from "react";
import { Group } from "@/models/groups";
import LinkUserModal from "../commons/LinkUserModal";
import { ScimReference } from "@/models/scim";

type LinkUserButtonProps = {
  group: Group;
  buttonText: string;
  confirmButtonText: string;
  cancelButtonText: string;
  modalTitle: string;
  action: (groupId: string, userRef: ScimReference) => Promise<void>;
};

export default function LinkUserButton(props: Readonly<LinkUserButtonProps>) {
  const {
    group,
    buttonText,
    confirmButtonText,
    cancelButtonText,
    modalTitle,
    action,
  } = props;

  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const _action = async (groupId: string, userRef: ScimReference) => {
    await action(groupId, userRef);
  };

  return (
    <>
      <Button onClick={openModal}>{buttonText}</Button>
      <LinkUserModal
        show={show}
        onClose={closeModal}
        title={modalTitle}
        group={group}
        action={_action}
        confirmButtonText={confirmButtonText}
        cancelButtonText={cancelButtonText}
      />
    </>
  );
}
