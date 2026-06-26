// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { toast } from "@/components/toaster";
import {
  assignAdminPrivileges,
  revokeAdminPrivileges,
} from "@/services/authorities";

type AssignPrivilegesProps = {
  userId: string;
  userFormattedName: string;
};

function AssignPrivileges(props: Readonly<AssignPrivilegesProps>) {
  const { userId, userFormattedName } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  const action = async () => {
    const res = await assignAdminPrivileges(userId);
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
        <span className="font-bold">{userFormattedName}</span>?
      </ConfirmModal>
      <Button className="btn-secondary" onClick={open}>
        Assign admin privileges
      </Button>
    </>
  );
}

type RevokePrivilegesProps = {
  userId: string;
  userFormattedName: string;
};

function RevokePrivileges(props: Readonly<RevokePrivilegesProps>) {
  const { userId, userFormattedName } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  const action = async () => {
    const res = await revokeAdminPrivileges(userId);
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
        <span className="font-bold">{userFormattedName}</span>?
      </ConfirmModal>

      <Button className="btn-secondary" onClick={open}>
        Revoke admin privileges
      </Button>
    </>
  );
}

type SetAdminPrivilegesProps = {
  userId: string;
  userFormattedName: string;
  isAdmin: boolean;
};

export function SetAdminPrivileges(props: Readonly<SetAdminPrivilegesProps>) {
  const { userId, userFormattedName, isAdmin } = props;
  return isAdmin ? (
    <RevokePrivileges userId={userId} userFormattedName={userFormattedName} />
  ) : (
    <AssignPrivileges userId={userId} userFormattedName={userFormattedName} />
  );
}
