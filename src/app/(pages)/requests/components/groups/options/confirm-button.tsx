// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import ConfirmModal from "@/components/confirm-modal";
import { GroupRequest } from "@/models/group-requests";
import { approveGroupRequest } from "@/services/group-requests";
import { useState } from "react";

type ConfirmButtonProps = {
  request: GroupRequest;
};

export default function ConfirmButton(props: Readonly<ConfirmButtonProps>) {
  const { request } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  const action = async () => {
    await approveGroupRequest(request.uuid);
    close();
  };

  return (
    <>
      <button
        type="button"
        className="popover-option"
        onClick={open}
      >
        Approve request
      </button>
      <ConfirmModal
        show={show}
        onClose={close}
        onConfirm={action}
        title="Approve Group Request"
      >
        <p>
          Are you sure you want the user <b>{request.userFullName}</b> to join
          the group <b>{request.groupName}</b>?
        </p>
        <p className="text-center">
          <i>{`"${request.notes}"`}</i>
        </p>
      </ConfirmModal>
    </>
  );
}
