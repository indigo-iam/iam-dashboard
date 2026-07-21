// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import ConfirmModal from "@/components/confirm-modal";
import { toast } from "@/components/toaster";
import { assignRole, revokeRole } from "@/services/authorities";
import { Field, LabeledCheckbox } from "@/components/form";

export type Role = "ROLE_ADMIN" | "ROLE_READER";

function roleName(role: Role) {
  if (role === "ROLE_ADMIN") {
    return "admin";
  } else if (role === "ROLE_READER") {
    return "reader";
  }
  return "";
}

type AssignRoleProps = {
  userId: string;
  userFormattedName: string;
  role: Role;
  show: boolean;
  onClose: () => void;
};

function AssignRole(props: Readonly<AssignRoleProps>) {
  const { userId, userFormattedName, role, show, onClose } = props;
  const action = async () => {
    const res = await assignRole(userId, role);
    toast.toast(res);
    close();
  };

  return (
    <ConfirmModal
      show={show}
      onConfirm={action}
      onClose={onClose}
      title={`Assign ${roleName(role)} privileges`}
      danger
    >
      {`Are you sure you want to assign role `}
      <b>{roleName(role)}</b>
      {` to user `}
      <span className="font-bold">{userFormattedName}</span>?
    </ConfirmModal>
  );
}

type RevokeRoleProps = {
  userId: string;
  userFormattedName: string;
  role: Role;
  show: boolean;
  onClose: () => void;
};

function RevokeRole(props: Readonly<RevokeRoleProps>) {
  const { userId, userFormattedName, role, show, onClose } = props;
  const action = async () => {
    const res = await revokeRole(userId, role);
    toast.toast(res);
    close();
  };
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      onConfirm={action}
      title={`Revoke '${roleName(role)}' role`}
      danger
    >
      {`Are you sure you want to revoke role `}
      <b>{roleName(role)}</b>
      {` to user `}
      <span className="font-bold"> {userFormattedName}</span>?
    </ConfirmModal>
  );
}

type RoleCheckboxProps = {
  userId: string;
  userFormattedName: string;
  role: Role;
  hasRole: boolean;
};

export function RoleCheckbox(props: Readonly<RoleCheckboxProps>) {
  const { userId, userFormattedName, role, hasRole } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <Field>
      <LabeledCheckbox checked={hasRole} onChange={open}>
        {roleName(role)}
      </LabeledCheckbox>
      {hasRole ? (
        <RevokeRole
          userId={userId}
          userFormattedName={userFormattedName}
          role={role}
          show={show}
          onClose={close}
        />
      ) : (
        <AssignRole
          userId={userId}
          userFormattedName={userFormattedName}
          role={role}
          show={show}
          onClose={close}
        />
      )}
    </Field>
  );
}
