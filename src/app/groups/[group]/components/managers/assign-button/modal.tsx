// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { SearchUsers } from "@/app/components/search-users";
import ConfirmModal from "@/components/confirm-modal";
import { type ModalProps } from "@/components/modal";
import { Group } from "@/models/groups";
import { User } from "@/models/scim";
import { assignGroupManager } from "@/services/groups";

import { useState } from "react";
import Link from "next/link";

type AssignGroupManagerModalProps = ModalProps & {
  group: Group;
};

type SearchUserViewProps = {
  group: Group;
  onSelect: (user: User) => void;
};

function SearchUserView(props: Readonly<SearchUserViewProps>) {
  const { group, onSelect } = props;
  const indigoGroup = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  const description = indigoGroup.description;
  return (
    <div className="space-y-4">
      <p>
        Type to search for an user to become manager of group{" "}
        <b>{group.displayName}</b>
        {description && (
          <>
            {" "}
            (<i>{description}</i>)
          </>
        )}
      </p>{" "}
      <SearchUsers onSelect={onSelect} />
    </div>
  );
}

type ConfirmViewProps = {
  group: Group;
  user: User;
};

function ConfirmView(props: Readonly<ConfirmViewProps>) {
  const { group, user } = props;
  const indigoGroup = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  const description = indigoGroup.description;
  return (
    <div className="space-y-4">
      <p>
        Are you sure you want to make the user{" "}
        <Link href={`/users/${user.id}`} className="underline">
          <b>{user.name?.formatted}</b> (<i>{user.emails?.[0].value}</i>)
        </Link>{" "}
        manager of the group <b>{group.displayName}</b>
        {description && (
          <>
            {" "}
            (<i>{description}</i>)
          </>
        )}
        ?
      </p>
    </div>
  );
}

export default function AssignGroupManagerModal(
  props: Readonly<AssignGroupManagerModalProps>
) {
  const { group, onClose, ...modalProps } = props;
  const [user, setUser] = useState<User>();
  const clear = () => setUser(undefined);

  const clearAndClose = () => {
    setTimeout(clear, 500);
    onClose();
  };

  const assignManager = async () => {
    if (user?.id) {
      await assignGroupManager(group, user);
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
    >
      <>
        {user ? (
          <ConfirmView group={group} user={user} />
        ) : (
          <SearchUserView group={group} onSelect={setUser} />
        )}
      </>
    </ConfirmModal>
  );
}
