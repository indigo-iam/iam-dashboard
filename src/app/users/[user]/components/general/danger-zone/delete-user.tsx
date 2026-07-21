// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { toast } from "@/components/toaster";
import { deleteUser } from "@/services/users";
import { useState } from "react";

type DeleteUserProps = {
  userId: string;
  userName: string;
  userFormattedName: string;
};

export function DeleteUser(props: Readonly<DeleteUserProps>) {
  const { userId, userName, userFormattedName } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  const action = async () => {
    const res = await deleteUser(userId);
    if (res.type === "success") {
      res.description = `User ${userFormattedName} has been deleted`;
    }
    toast.toast(res);
  };
  return (
    <>
      <Button className="btn-danger" onClick={open}>
        Delete user
      </Button>
      <ConfirmModal
        show={show}
        onClose={close}
        onConfirm={action}
        danger
        title="Delete user"
      >
        Are you sure you want to delete user
        <span className="font-bold">{userFormattedName}</span>
        <span>({userName})</span>?
      </ConfirmModal>
    </>
  );
}
