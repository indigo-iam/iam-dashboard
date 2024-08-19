"use client";
import { DeleteButton } from "@/components/Buttons";
import DeleteGroupModal from "./DeleteGroupModal";
import { useState } from "react";
import { ScimReference } from "@/models/scim";

type DeleteGroupButtonProps = {
  group: ScimReference;
  onDeleted?: () => void;
};

export default function DeleteGroupButton(
  props: Readonly<DeleteGroupButtonProps>
) {
  const { group, onDeleted } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const action = () => {
    showModal();
  };

  return (
    <>
      <form action={action}>
        <DeleteButton type="submit" title="Delete Group" />
      </form>
      <DeleteGroupModal
        group={group}
        show={isModalOpen}
        onClose={closeModal}
        onDeleted={onDeleted}
      />
    </>
  );
}
