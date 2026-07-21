// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import Link from "next/link";

import ConfirmModal from "@/components/confirm-modal";
import { Field, Label } from "@/components/form";
import { toast } from "@/components/toaster";
import { Group } from "@/models/groups";
import { addUserToGroup } from "@/services/groups";
import { SearchGroups } from "./search-groups";

type AssignUserToGroupModalProps = {
  show: boolean;
  onClose: () => void;
  userId: string;
  userFormattedName: string;
  userEmail: string;
};

export function AssignUserToGroupModal(
  props: Readonly<AssignUserToGroupModalProps>
) {
  const { userId, userFormattedName, userEmail, show, onClose } = props;
  const [selected, setSelected] = useState<Group>();
  const disabled = selected === undefined;

  function unselect() {
    setSelected(undefined);
  }

  function close() {
    onClose();
    setTimeout(unselect, 300);
  }

  async function submit() {
    if (!selected) {
      console.warn("Cannot assign unknown user to group");
      return;
    }
    const res = await addUserToGroup(selected.id, userId, userFormattedName);
    toast.toast(res);
    close();
  }

  return (
    <ConfirmModal
      show={show}
      onClose={close}
      title="Assign user to group"
      onConfirm={submit}
      confirmButtonDisabled={disabled}
    >
      {selected ? (
        <div className="space-y-4">
          <p>
            Are you sure you want to add the user{" "}
            <Link href={`/users/${userId}`} className="underline">
              <b>{userFormattedName}</b> (<i>{userEmail}</i>)
            </Link>{" "}
            to the group{" "}
            <Link href={`/groups/${selected.id}`} className="underline">
              <b>{selected.displayName}</b>
            </Link>{" "}
            ?
          </p>
        </div>
      ) : (
        <Field>
          <Label>Select a group</Label>
          <SearchGroups listId="search-group-assign" onSelect={setSelected} />
        </Field>
      )}
    </ConfirmModal>
  );
}
