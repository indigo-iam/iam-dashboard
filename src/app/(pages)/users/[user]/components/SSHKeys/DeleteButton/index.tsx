"use client";
import { DeleteButton } from "@/components/Buttons";
import { ScimUser } from "@/models/scim";
import { useState } from "react";
import DeleteSSHKeyConfirmModal from "./ConfirmModal";
import { SSHKey } from "@/models/indigo-user";

type DeleteSSHKeyButtonProps = {
  user: ScimUser;
  sshKey: SSHKey;
};

export default function DeleteSSHKeyButton(
  props: Readonly<DeleteSSHKeyButtonProps>
) {
  const { user, sshKey } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const action = () => {
    showModal();
  };

  return (
    <div className="m-auto">
      <form action={action}>
        <DeleteButton type="submit" title="Delete SSH Key" />
      </form>
      <DeleteSSHKeyConfirmModal
        user={user}
        sshKey={sshKey}
        show={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
