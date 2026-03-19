// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { User } from "@/models/scim";
import { JoinGroupModal } from "./modal";
import { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline";

type JoinGroupButtonProps = {
  user: User;
  isAdmin?: boolean;
};

export default function JoinGroupButton(props: Readonly<JoinGroupButtonProps>) {
  const { user, isAdmin } = props;
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
        <span>Join group</span>
      </Button>
      <JoinGroupModal
        title="Join group"
        user={user}
        show={show}
        onClose={closeModal}
        isAdmin={isAdmin}
      />
    </>
  );
}
