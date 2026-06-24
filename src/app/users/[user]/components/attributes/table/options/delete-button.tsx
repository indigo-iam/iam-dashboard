// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { toast } from "@/components/toaster";
import { Attribute } from "@/models/attributes";
import { deleteAttribute } from "@/services/users";

type DeleteButtonProps = {
  userId: string;
  userName: string;
  attr: Attribute;
  show: boolean;
  onClose: () => void;
};

export default function DeleteUserModal(props: Readonly<DeleteButtonProps>) {
  const { userId, userName, attr, show, onClose } = props;
  const action = async () => {
    const res = await deleteAttribute(userId, attr);
    toast.toast(res);
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
        The following attribute will be removed from <b>{userName}</b> account:
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
