"use client";
import { DeleteButton } from "@/components/Buttons";
import { Attribute } from "@/models/attributes";
import { User } from "@/models/scim";
import DeleteAttributeConfirmModal from "./ConfirmModal";
import { useState } from "react";

type DeleteButtonProps = {
  user: User;
  attr: Attribute;
};

export default function DeleteAttributeButton(
  props: Readonly<DeleteButtonProps>
) {
  const { user, attr } = props;
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <DeleteButton type="button" onClick={showModal} />
      <DeleteAttributeConfirmModal
        user={user}
        attr={attr}
        show={show}
        onClose={closeModal}
      />
    </>
  );
}
