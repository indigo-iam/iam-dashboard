// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { type ModalProps } from "@/components/modal";
import { Group } from "@/models/groups";
import { User } from "@/models/scim";
import { addUserToGroup } from "@/services/groups";
import { SearchUsers } from "@/app/components/search-users";
import { useState } from "react";
import ConfirmModal from "@/components/confirm-modal";
import Link from "next/link";

type AddMemberModalProps = ModalProps & {
  group: Group;
};

type SearchUsersViewProps = {
  group: Group;
  onSelect: (user: User) => void;
};

function SearchUsersView(props: Readonly<SearchUsersViewProps>) {
  const { group, onSelect } = props;
  const indigoGroup = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  const groupName = group.displayName;
  const groupDescription = indigoGroup.description;
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
      <SearchUsers onSelect={onSelect} />
    </div>
  );
}

type ConfirmViewPros = {
  user: User;
  group: Group;
};

function ConfirmView(props: Readonly<ConfirmViewPros>) {
  const { user, group } = props;
  const indigoGroup = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  const groupName = group.displayName;
  const groupDescription = indigoGroup.description;
  return (
    <p>
      Are you sure you want to add the user{" "}
      <Link href={`/users/${user.id}`} className="underline">
        <b>{user.name?.formatted}</b> (<i>{user.emails?.[0].value}</i>)
      </Link>{" "}
      to group to group <b>{groupName}</b> (
      <span className="italic">{groupDescription}</span>)?
    </p>
  );
}

export default function AddMemberModal(props: Readonly<AddMemberModalProps>) {
  const { group, onClose, ...modalProps } = props;
  const indigoGroup = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  const groupName = group.displayName;
  const [user, setUser] = useState<User>();

  const clear = () => setUser(undefined);

  const clearAndClose = () => {
    props.onClose();
    setTimeout(() => clear, 500);
  };

  const addMember = async () => {
    if (user?.id) {
      await addUserToGroup(group.id, user);
      clearAndClose();
    }
  };

  return (
    <ConfirmModal
      onClose={clearAndClose}
      {...modalProps}
      title={`Add member to group ${groupName}`}
      onConfirm={addMember}
      onCancel={clear}
      confirmButtonDisabled={!user}
    >
      <>
        {user ? (
          <ConfirmView user={user} group={group} />
        ) : (
          <SearchUsersView group={group} onSelect={setUser} />
        )}
      </>
    </ConfirmModal>
  );
}
