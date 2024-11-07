"use client";
import { DeleteButton } from "@/components/Buttons";
import { User } from "@/models/scim";
import { GroupRequest } from "@/models/group-requests";
import { useState } from "react";
import DeleteGroupRequestModal from "./ConfirmModal";

type DeleteGroupRequestButtonProps = {
  user: User;
  isMe: boolean;
  groupRequest: GroupRequest;
};

export default function DeleteGroupRequestButton(
  props: Readonly<DeleteGroupRequestButtonProps>
) {
  const { user, isMe, groupRequest } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);
  const action = () => showModal();
  return (
    <div className="m-auto">
      <form action={action}>
        <DeleteButton type="submit" title="Delete Group Request" />
      </form>
      <DeleteGroupRequestModal
        user={user}
        isMe={isMe}
        groupRequest={groupRequest}
        show={isModalOpen}
        onClose={hideModal}
      />
    </div>
  );
}
