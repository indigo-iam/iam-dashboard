"use client";
import { SSHKey } from "@/models/indigo-user";
import { User } from "@/models/scim";
import { useState } from "react";
import DeleteSSHKeyConfirmModal from "./ConfirmModal";

type DeleteKeyProps = {
  user: User;
  sshKey: SSHKey;
};

export default function DeleteKey(props: Readonly<DeleteKeyProps>) {
  const { user, sshKey } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <button
        className="popover-option text-danger"
        type="button"
        title="Delete SSH Key"
        onClick={showModal}
      >
        Delete
      </button>
      <DeleteSSHKeyConfirmModal
        user={user}
        sshKey={sshKey}
        show={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
