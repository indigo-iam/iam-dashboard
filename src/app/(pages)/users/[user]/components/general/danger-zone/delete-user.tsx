// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { User } from "@/models/scim";
import { deleteUser } from "@/services/users";
import { useState } from "react";

type DeleteUserProps = {
  user: User;
};

export function DeleteUser(props: Readonly<DeleteUserProps>) {
  const { user } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  const action = async () => {
    await deleteUser(user);
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
        <span className="font-bold"> {user.name?.formatted} </span>
        <span>({user.userName})</span>?
      </ConfirmModal>
    </>
  );
}
