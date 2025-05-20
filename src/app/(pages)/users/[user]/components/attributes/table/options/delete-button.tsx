// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import InfoTable from "@/components/info-table";
import { Attribute } from "@/models/attributes";
import { User } from "@/models/scim";
import { deleteAttribute } from "@/services/users";
import { useState } from "react";

type DeleteButtonProps = {
  user: User;
  attr: Attribute;
};

export default function DeleteButton(props: Readonly<DeleteButtonProps>) {
  const { user, attr } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  const action = async () => {
    await deleteAttribute(user.id, attr);
    close();
  };

  const data = [
    { name: "Attribute Name", value: attr.name },
    { name: "Attribute Value", value: attr.value },
  ];

  return (
    <>
      <ConfirmModal
        show={show}
        onClose={close}
        confirmButtonText="Delete Attribute"
        title="Delete Attribute"
        onConfirm={action}
      >
        <p>
          The following attribute will be removed from{" "}
          <b>{user.name?.formatted}</b> account:
        </p>
        <InfoTable data={data} />
      </ConfirmModal>
      <button type="button" className="popover-option-danger" onClick={open}>
        Delete Button
      </button>
    </>
  );
}
