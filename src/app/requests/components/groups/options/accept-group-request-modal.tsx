// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import ConfirmModal from "@/components/confirm-modal";
import Link from "@/components/link";
import { Notice } from "@/components/notices";
import { Textarea } from "@/components/textarea";
import { GroupRequest } from "@/models/group-requests";
import { approveGroupRequest } from "@/services/group-requests";

type DeleteGroupRequestButtonProps = {
  request: GroupRequest;
  show: boolean;
  onClose: () => void;
};

export default function AcceptGroupRequestModal(
  props: Readonly<DeleteGroupRequestButtonProps>
) {
  const { request, show, onClose } = props;

  const action = async () => {
    await approveGroupRequest(request.uuid);
    onClose();
  };
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      onConfirm={action}
      title="Approve group request?"
      confirmButtonText="Approve request"
    >
      <div className="space-y-4">
        <p>
          Are you sure you want the following user to join the group{" "}
          <b>{request.groupName}</b>?
        </p>
        <Notice>
          <Link className="iam-link" href={`/users/${request.userUuid}`}>
            {request.userFullName}
          </Link>
        </Notice>
      </div>
      <p>They provided the following motivation:</p>
      <Textarea className="iam-input" defaultValue={request.notes} disabled />
    </ConfirmModal>
  );
}
