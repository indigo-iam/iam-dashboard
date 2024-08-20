"use client";
import { Button } from "@/components/Buttons";
import AddMemberModal from "./AddMemberModal";
import { useState } from "react";
import { Group } from "@/models/groups";

type AddMemberButtonProps = {
  group: Group;
};

export default function AddMemberButton(props: Readonly<AddMemberButtonProps>) {
  const { group } = props;
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <Button onClick={openModal}>Add Group Member</Button>
      <AddMemberModal
        show={show}
        onClose={closeModal}
        title="Add Group Member"
        group={group}
      />
    </>
  );
}
