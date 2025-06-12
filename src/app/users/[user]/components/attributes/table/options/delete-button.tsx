// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Attribute } from "@/models/attributes";
import { User } from "@/models/scim";
import { deleteAttribute } from "@/services/users";

type DeleteButtonProps = {
  user: User;
  attr: Attribute;
  show: boolean;
  onClose: () => void;
};

export default function DeleteUserModal(props: Readonly<DeleteButtonProps>) {
  const { user, attr, show, onClose } = props;
  const action = async () => {
    await deleteAttribute(user.id, attr);
    onClose();
  };
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete"
      title="Delete Attribute"
      onConfirm={action}
      danger
    >
      <p>
        The following attribute will be removed from{" "}
        <b>{user.name?.formatted}</b> account:
      </p>
      <ul className="flex flex-col">
        <li className="inline-flex gap-1">
          <span className="font-bold">Name:</span>
          <span>{attr.name}</span>
        </li>
        <li className="inline-flex gap-1">
          <span className="font-bold">Value:</span>
          <span>{attr.value}</span>
        </li>
      </ul>
    </ConfirmModal>
  );
}
