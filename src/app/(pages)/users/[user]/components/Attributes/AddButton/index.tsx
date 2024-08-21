"use client";
import { Button } from "@/components/Buttons";
import { ScimUser } from "@/models/scim";
import { useState } from "react";
import AddAttributeModal from "./AddAttributeModal";

type AddButtonProps = {
  user: ScimUser;
};

export default function AddAttributeButton(props: Readonly<AddButtonProps>) {
  const { user } = props;
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  return (
    <>
      <Button onClick={openModal}>Add Attribute</Button>
      <AddAttributeModal show={show} onClose={closeModal} user={user} />
    </>
  );
}
