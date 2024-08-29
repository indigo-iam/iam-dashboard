"use client";
import { DeleteButton } from "@/components/Buttons";
import DeleteClientModal from "./DeleteClientModal";
import { useState } from "react";
import { Client } from "@/models/client";

type DeleteClientButtonProps = {
  client: Client;
  onDeleted?: () => void;
};

export default function DeleteClientButton(
  props: Readonly<DeleteClientButtonProps>
) {
  const { client, onDeleted } = props;
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
      <DeleteClientModal
        client={client}
        show={isModalOpen}
        onClose={closeModal}
        onDeleted={onDeleted}
      />
    </>
  );
}
