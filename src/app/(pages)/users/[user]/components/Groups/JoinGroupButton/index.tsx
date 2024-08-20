"use client";
import { Button } from "@/components/Buttons";
import { ScimUser } from "@/models/scim";
import { JoinGroupModal } from "./JoinGroupModal";
import { useState } from "react";

type JoinGroupButtonProps = {
  user: ScimUser;
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
      <Button onClick={openModal}>{title}</Button>
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
