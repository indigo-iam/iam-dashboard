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
      title="Remove Member from Group"
      onConfirm={action}
      danger
      {...modalProps}
    >
      <p>Are you sure you want to remove user </p>
      <p className="flex justify-center">
        <b>{userRef.display}</b> ({userRef.value})
      </p>
      <p>
        from group <b>{group.displayName}</b>?
      </p>
    </ConfirmModal>
  );
}
