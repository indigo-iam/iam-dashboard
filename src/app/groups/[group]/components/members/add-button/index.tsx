// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/buttons";
import AddMemberModal from "./modal";

type AddMemberButtonProps = {
  groupId: string;
  groupName: string;
  groupDescription?: string | null;
};

export default function AddMemberButton(props: Readonly<AddMemberButtonProps>) {
  const { groupId, groupName, groupDescription } = props;
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  return (
    <>
      <Button className="btn-secondary" onClick={openModal}>
        <UserPlusIcon className="size-4" />
        <span>Add member</span>
      </Button>
      <AddMemberModal
        show={show}
        onClose={closeModal}
        groupId={groupId}
        groupName={groupName}
        groupDescription={groupDescription}
      />
    </>
  );
}
