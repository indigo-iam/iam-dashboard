"use client";
import { Button } from "@/components/Buttons";
import { Group } from "@/models/groups";
import AssignGroupManagerModal from "./AssignManagerModal";
import { useState } from "react";

type AssignGroupManagerButtonProps = {
  group: Group;
};

export default function AssignGroupManagerButton(
  props: Readonly<AssignGroupManagerButtonProps>
) {
  const { group } = props;
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  return (
    <>
      <Button onClick={openModal}>Assign Group Manager</Button>
      <AssignGroupManagerModal show={show} onClose={closeModal} group={group} />
    </>
  );
}
