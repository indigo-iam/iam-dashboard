// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

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
          Are you sure you want to remove user <b>{userRef.display}</b> from
          group
        </p>
        <div className="flex flex-col items-center">
          <p className="font-bold">{group.displayName}</p>
          <p className="text-sm font-light">
            {group["urn:indigo-dc:scim:schemas:IndigoGroup"].description}
          </p>{" "}
          <p className="text-xs font-light">{group.id}</p>
        </div>
      </div>
    </ConfirmModal>
  );
}
