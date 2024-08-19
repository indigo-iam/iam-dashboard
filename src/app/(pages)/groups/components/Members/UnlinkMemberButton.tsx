"use client";
import { DeleteButton } from "@/components/Buttons";
import { Group } from "@/models/groups";
import { ScimReference } from "@/models/scim";
import { useState } from "react";
import ConfirmUnlinkUserModal from "./ConfirmModal";

type UnlinkMemberButtonProps = {
  user: ScimReference;
  group: Group;
};

export default function UnlinkMemberButton(
  props: Readonly<UnlinkMemberButtonProps>
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
        <DeleteButton type="submit" title="Remove Membership" />
      </form>
      <ConfirmUnlinkUserModal
        user={user}
        group={group}
        show={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
