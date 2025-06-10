// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { SSHKey } from "@/models/indigo-user";
import { User } from "@/models/scim";
import { useState } from "react";
import DeleteSSHKeyConfirmModal from "./modal";

type DeleteButtonProps = {
  user: User;
  sshKey: SSHKey;
};

export default function DeleteButton(props: Readonly<DeleteButtonProps>) {
  const { user, sshKey } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <button
        className="popover-option-danger"
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
