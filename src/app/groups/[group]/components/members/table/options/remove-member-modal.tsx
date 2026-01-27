// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { ModalProps } from "@/components/modal";
import { Group } from "@/models/groups";
import { User } from "@/models/scim";
import { removeUserFromGroup } from "@/services/groups";

interface RevokeMemberFromGroupModalProps extends ModalProps {
  user: User;
  group: Group;
}

export default function RemoveMemberFromGroupModal(
  props: Readonly<RevokeMemberFromGroupModalProps>
) {
  const { user, group, ...modalProps } = props;

  const action = async () => {
    await removeUserFromGroup(group.id, user);
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
        <b>{user.displayName}</b> ({user.id})
      </p>
      <p>
        from group <b>{group.displayName}</b>?
      </p>
    </ConfirmModal>
  );
}
