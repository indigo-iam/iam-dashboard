// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { SearchUsers } from "@/app/components/search-users";
import ConfirmModal from "@/components/confirm-modal";
import { type ModalProps } from "@/components/modal";
import { toast } from "@/components/toaster";
import { User } from "@/models/scim";
import { assignGroupManager } from "@/services/groups";

import { useState } from "react";
import Link from "next/link";

type SearchUserViewProps = {
  groupName: string;
  groupDescription?: string | null;
  onSelect: (user: User) => void;
};

function SearchUserView(props: Readonly<SearchUserViewProps>) {
  const { groupName, groupDescription, onSelect } = props;
  return (
    <div className="space-y-4">
      <p>
        Type to search for an user to become manager of group <b>{groupName}</b>
        {groupDescription && (
          <>
            {" "}
            (<i>{groupDescription}</i>)
          </>
        )}
      </p>{" "}
      <SearchUsers listId="search-list-managers" onSelect={onSelect} />
    </div>
  );
}

type ConfirmViewProps = {
  groupName: string;
  groupDescription?: string | null;
  user: User;
};

function ConfirmView(props: Readonly<ConfirmViewProps>) {
  const { groupName, groupDescription, user } = props;
  return (
    <div className="space-y-4">
      <p>
        Are you sure you want to make the user{" "}
        <Link href={`/users/${user.id}`} className="underline">
          <b>{user.name?.formatted}</b> (<i>{user.emails?.[0].value}</i>)
        </Link>{" "}
        manager of the group <b>{groupName}</b>
        {groupDescription && (
          <>
            {" "}
            (<i>{groupDescription}</i>)
          </>
        )}
        ?
      </p>
    </div>
  );
}

type AssignGroupManagerModalProps = ModalProps & {
  groupId: string;
  groupName: string;
  groupDescription?: string | null;
};

export default function AssignGroupManagerModal(
  props: Readonly<AssignGroupManagerModalProps>
) {
  const { groupId, groupName, groupDescription, onClose, ...modalProps } =
    props;
  const [user, setUser] = useState<User>();
  const clear = () => setUser(undefined);

  const clearAndClose = () => {
    setTimeout(clear, 500);
    onClose();
  };

  const assignManager = async () => {
    if (user?.id) {
      const res = await assignGroupManager(groupId, user);
      if (res.type === "success") {
        res.description = `User ${user.displayName} has been assigned manager of group ${groupName}`;
      }
      toast.toast(res);
      clearAndClose();
    }
  };

  return (
    <ConfirmModal
      onClose={clearAndClose}
      {...modalProps}
      title="Assign group manager"
      onConfirm={assignManager}
      onCancel={clear}
      confirmButtonDisabled={!user}
    >
      <>
        {user ? (
          <ConfirmView
            groupName={groupName}
            groupDescription={groupDescription}
            user={user}
          />
        ) : (
          <SearchUserView
            groupName={groupName}
            groupDescription={groupDescription}
            onSelect={setUser}
          />
        )}
      </>
    </ConfirmModal>
  );
}
