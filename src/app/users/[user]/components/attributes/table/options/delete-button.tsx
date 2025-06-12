// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import InfoTable from "@/components/info-table";
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
  const data = [
    { name: "Attribute Name", value: attr.name },
    { name: "Attribute Value", value: attr.value },
  ];
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
      <InfoTable data={data} />
    </ConfirmModal>
  );
}
