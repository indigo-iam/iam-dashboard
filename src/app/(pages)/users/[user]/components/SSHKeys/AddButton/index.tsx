"use client";
import { Button } from "@/components/Buttons";
import { User } from "@/models/scim";
import AddSSHKeyModal from "./AddSSHKeyModal";
import { useState } from "react";

type AddSSHKeyButtonProps = {
  user: User;
};

export default function AddSSHKeyButton(props: Readonly<AddSSHKeyButtonProps>) {
  const { user } = props;
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <Button onClick={openModal}>Add SSH Key</Button>
      <AddSSHKeyModal show={show} onClose={closeModal} user={user} />
    </>
  );
}
