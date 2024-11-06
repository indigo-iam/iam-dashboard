"use client";
import ConfirmRevokeGroupManagerModal from "./ConfirmModal";
import { DeleteButton } from "@/components/Buttons";
import { Group } from "@/models/groups";
import { User } from "@/models/scim";
import { useState } from "react";

type RevokeManagerButtonProps = {
  user: User;
  group: Group;
};

export default function RevokeManagerButton(
  props: Readonly<RevokeManagerButtonProps>
) {
  const { user, group } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const action = () => {
    showModal();
  };

  return (
    <>
      <form action={action}>
        <DeleteButton type="submit" title="Revoke Group Manager" />
      </form>
      <ConfirmRevokeGroupManagerModal
        user={user}
        group={group}
        show={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
