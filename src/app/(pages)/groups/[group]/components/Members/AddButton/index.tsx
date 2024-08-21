"use client";
import { Button } from "@/components/Buttons";
import { Group } from "@/models/groups";
import AddMemberModal from "./AddMemberModal";
import { useState } from "react";

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
      <Button onClick={openModal}>Add Member</Button>
      <AddMemberModal show={show} onClose={closeModal} group={group} />
    </>
  );
}
