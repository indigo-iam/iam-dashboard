// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { toast } from "@/components/toaster";
import { User } from "@/models/scim";
import {
  assignAdminPrivileges,
  revokeAdminPrivileges,
} from "@/services/authorities";
import { useState } from "react";

function AssignPrivileges(props: Readonly<{ user: User }>) {
  const { user } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  const action = async () => {
    const res = await assignAdminPrivileges(user.id);
    toast.toast(res);
    close();
  };
  return (
    <>
      <ConfirmModal
        show={show}
        onConfirm={action}
        onClose={close}
        title="Assign admin privileges"
        danger
      >
        Are you sure you want to assign admin privileges to user{" "}
        <span className="font-bold">{user.name?.formatted}</span>?
      </ConfirmModal>
      <Button className="btn-secondary" onClick={open}>
        Assign admin privileges
      </Button>
    </>
  );
}

function RevokePrivileges(props: Readonly<{ user: User }>) {
  const { user } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  const action = async () => {
    const res = await revokeAdminPrivileges(user.id);
    toast.toast(res);
    close();
  };
  return (
    <>
      <ConfirmModal
        show={show}
        onClose={close}
        onConfirm={action}
        title="Revoke admin privileges"
        danger
      >
        {" "}
        Are you sure you want to revoke admin privileges to user{" "}
        <span className="font-bold">{user.name?.formatted}</span>?
      </ConfirmModal>

      <Button className="btn-secondary" onClick={open}>
        Revoke admin privileges
      </Button>
    </>
  );
}

type SetAdminPrivilegesProps = {
  user: User;
};

export function SetAdminPrivileges(props: Readonly<SetAdminPrivilegesProps>) {
  const { user } = props;
  const isAdmin = user[
    "urn:indigo-dc:scim:schemas:IndigoUser"
  ]?.authorities?.find(role => role === "ROLE_ADMIN");

  return isAdmin ? (
    <RevokePrivileges user={user} />
  ) : (
    <AssignPrivileges user={user} />
  );
}
