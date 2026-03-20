// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "next/link";

import ConfirmModal from "@/components/confirm-modal";
import { Group } from "@/models/groups";
import { User } from "@/models/scim";
import { revokeGroupManager } from "@/services/groups";

type RevokeGroupManagerModal = {
  user: User;
  group: Group;
  show: boolean;
  onClose: () => void;
  onUnlinked?: () => void;
};

export default function RevokeGroupManagerModal(
  props: Readonly<RevokeGroupManagerModal>
) {
  const { user, group, show, onClose, onUnlinked } = props;
  const indigoUser = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  const description = indigoUser.description;
  const handleConfirm = async () => {
    await revokeGroupManager(group.id, user.id);
    onClose();
    onUnlinked?.();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Revoke Manager"
      title="Revoke group manager privileges"
      onConfirm={handleConfirm}
      danger
    >
      <p>
        Are you sure you want to revoke group manager privileges from user{" "}
        <Link href={`/users/${user.id}`} className="underline">
          <b className="text-nowrap">{user.name?.formatted}</b> (
          <i className="text-nowrap">{user.emails?.[0].value}</i>)
        </Link>{" "}
        for group <b>{group.displayName}</b>
        {description && (
          <>
            {" "}(<i>{description}</i>)
          </>
        )}
        ?
      </p>
    </ConfirmModal>
  );
}
