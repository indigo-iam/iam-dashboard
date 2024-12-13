"use client";
import { Button } from "@/components/buttons";
import { User } from "@/models/scim";
import { useState } from "react";
import AddAttributeModal from "./ modal";

type AddButtonProps = {
  user: User;
};

export default function AddAttributeButton(props: Readonly<AddButtonProps>) {
  const { user } = props;
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  return (
    <>
      <Button action="primary-outline" onClick={openModal}>
        Add Attribute
      </Button>
      <AddAttributeModal show={show} onClose={closeModal} user={user} />
    </>
  );
}
