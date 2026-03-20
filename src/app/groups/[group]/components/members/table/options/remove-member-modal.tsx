// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "next/link";

import ConfirmModal from "@/components/confirm-modal";
import { ModalProps } from "@/components/modal";
import { Group } from "@/models/groups";
import { ScimReference } from "@/models/scim";
import { removeUserByRefFromGroup } from "@/services/groups";

interface RevokeMemberFromGroupModalProps extends ModalProps {
  userRef: ScimReference;
  group: Group;
}

export default function RemoveMemberFromGroupModal(
  props: Readonly<RevokeMemberFromGroupModalProps>
) {
  const { userRef, group, ...modalProps } = props;
  const indigoGroup = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  const description = indigoGroup.description;
  const action = async () => {
    await removeUserByRefFromGroup(group.id, userRef);
  };

  return (
    <ConfirmModal
      title="Remove member from group"
      onConfirm={action}
      danger
      {...modalProps}
    >
      <div className="space-y-2">
        <p>
          Are you sure you want to remove the user{" "}
          <Link href={`/users/${userRef.value}`} className="underline">
            <b>{userRef.display}</b>
          </Link>{" "}
          from group <b>{group.displayName}</b>{" "}
          {description && (
            <>
              (<span className="italic">{description}</span>)
            </>
          )}
          ?
        </p>
      </div>
    </ConfirmModal>
  );
}
