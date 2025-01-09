"use client";
import { Button } from "@/components/buttons";
import { User } from "@/models/scim";
import { JoinGroupModal } from "./modal";
import { useState } from "react";

type JoinGroupButtonProps = {
  user: User;
  isAdmin?: boolean;
};

export default function JoinGroupButton(props: Readonly<JoinGroupButtonProps>) {
  const { user, isAdmin } = props;
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  const title = isAdmin ? "Join Group" : "Ask to Join Group";
  return (
    <>
      <Button action="primary-outline" onClick={openModal}>
        {title}
      </Button>
      <JoinGroupModal
        title={title}
        user={user}
        groups={[]}
        show={show}
        onClose={closeModal}
        isAdmin={isAdmin}
      />
    </>
  );
}