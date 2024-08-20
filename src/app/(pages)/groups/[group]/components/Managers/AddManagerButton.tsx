"use client";
import { Button } from "@/components/Buttons";
import ManagerModal from "./AddManagerModal";
import { useState } from "react";
import { Group } from "@/models/groups";

type AddManagersButtonProps = {
  group: Group;
};

export default function AddManagersButton(
  props: Readonly<AddManagersButtonProps>
) {
  const { group } = props;
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <Button onClick={openModal}>Add Group Manager</Button>
      <ManagerModal
        show={show}
        onClose={closeModal}
        title="Add Group Manager Privileges"
        group={group}
      />
    </>
  );
}
