// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/buttons";
import { AssignUserToGroupModal } from "./assign-modal";
import { JoinGroupModal } from "./join-modal";

type JoinGroupButtonProps = {
  userId: string;
  userName: string;
  userFormattedName: string;
  userEmail: string;
  isAdmin?: boolean;
};

export default function JoinGroupButton(props: Readonly<JoinGroupButtonProps>) {
  const { userId, userName, userFormattedName, userEmail, isAdmin } = props;
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  return (
    <>
      <Button
        className="btn-secondary flex items-center gap-1"
        onClick={openModal}
      >
        <UserPlusIcon className="size-4" />
        <span>{isAdmin ? "Assign to group" : "Join group"}</span>
      </Button>
      {isAdmin ? (
        <AssignUserToGroupModal
          userId={userId}
          userFormattedName={userFormattedName}
          userEmail={userEmail}
          show={show}
          onClose={closeModal}
        />
      ) : (
        <JoinGroupModal userName={userName} show={show} onClose={closeModal} />
      )}
    </>
  );
}
