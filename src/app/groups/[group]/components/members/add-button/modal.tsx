// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { SearchUsers } from "@/app/components/search-users";
import ConfirmModal from "@/components/confirm-modal";
import { type ModalProps } from "@/components/modal";
import { toast } from "@/components/toaster";
import { User } from "@/models/scim";
import { addUserToGroup } from "@/services/groups";
import Link from "@/components/link";

type SearchUsersViewProps = {
  groupName: string;
  groupDescription?: string | null;
  onSelect: (user: User) => void;
};

function SearchUsersView(props: Readonly<SearchUsersViewProps>) {
  const { groupName, groupDescription, onSelect } = props;
  return (
    <div className="space-y-4">
      <p>
        Type to search for an user add to the group <b>{groupName}</b>{" "}
        {groupDescription && (
          <>
            (<span className="italic">{groupDescription}</span>)
          </>
        )}
      </p>
      <SearchUsers onSelect={onSelect} listId="search-member" />
    </div>
  );
}

type ConfirmViewPros = {
  userId: string;
  userName: string;
  userEmail: string;
  groupName: string;
  groupDescription?: string | null;
};

function ConfirmView(props: Readonly<ConfirmViewPros>) {
  const { userId, userName, userEmail, groupName, groupDescription } = props;
  return (
    <p>
      Are you sure you want to add the user{" "}
      <Link href={`/users/${userId}`} className="underline">
        <b>{userName}</b> (<i>{userEmail}</i>)
      </Link>{" "}
      to group to group <b>{groupName}</b> (
      <span className="italic">{groupDescription}</span>)?
    </p>
  );
}

type AddMemberModalProps = ModalProps & {
  groupId: string;
  groupName: string;
  groupDescription?: string | null;
};

export default function AddMemberModal(props: Readonly<AddMemberModalProps>) {
  const { groupId, groupName, groupDescription, onClose, ...modalProps } =
    props;

  const [user, setUser] = useState<User>();

  const clear = () => setUser(undefined);

  const clearAndClose = () => {
    onClose();
    setTimeout(() => clear, 500);
  };

  const addMember = async () => {
    if (!user) {
      console.warn("Cannot add member, user is undefined");
      return;
    }
    const userId = user.id;
    const userName = user.name?.displayName ?? "unknown user";
    const res = await addUserToGroup(groupId, userId, userName);
    if (res.type === "success") {
      res.description = `User ${userName} has been added to group ${groupName}`;
    }
    toast.toast(res);
    clearAndClose();
  };

  return (
    <ConfirmModal
      {...modalProps}
      onClose={clearAndClose}
      title={`Add member to group ${groupName}`}
      onConfirm={addMember}
      onCancel={clear}
      confirmButtonDisabled={!user}
    >
      <>
        {user ? (
          <ConfirmView
            userId={user.id}
            userName={user.name?.formatted ?? "unknown user"}
            userEmail={user.emails?.[0].value ?? "unknown email"}
            groupName={groupName}
            groupDescription={groupDescription}
          />
        ) : (
          <SearchUsersView
            groupName={groupName}
            groupDescription={groupDescription}
            onSelect={setUser}
          />
        )}
      </>
    </ConfirmModal>
  );
}
