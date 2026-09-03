// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Button } from "@/components/buttons";
import DeleteUserModal from "./modal";
import { redirect } from "next/navigation";

type DeleteUserProps = {
  userId: string;
  userFormattedName: string;
  userEmail: string;
};

export function DeleteUser(props: Readonly<DeleteUserProps>) {
  const { userId, userEmail, userFormattedName } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  const deleted = () => redirect("/users");
  return (
    <>
      <Button className="btn-danger" onClick={open}>
        Delete user
      </Button>
      <DeleteUserModal
        userId={userId}
        userFormattedName={userFormattedName}
        userEmail={userEmail}
        show={show}
        onClose={close}
        onDeleted={deleted}
      />
    </>
  );
}
