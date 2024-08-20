"use client";
import { DeleteButton } from "@/components/Buttons";
import { ScimReference } from "@/models/scim";
import { useState } from "react";
import ConfirmUnlinkUserModal from "./ConfirmModal";

type UnlinkMemberButtonProps = {
  userRef: ScimReference;
  groupId: string;
  groupName: string;
};

export default function UnlinkMemberButton(
  props: Readonly<UnlinkMemberButtonProps>
) {
  const { userRef, groupId, groupName } = props;
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
        userRef={userRef}
        groupId={groupId}
        groupName={groupName}
        show={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
