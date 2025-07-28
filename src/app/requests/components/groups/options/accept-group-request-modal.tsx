// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import ConfirmModal from "@/components/confirm-modal";
import { Label } from "@/components/form";
import { Textarea } from "@/components/textarea";
import { GroupRequest } from "@/models/group-requests";
import { approveGroupRequest } from "@/services/group-requests";
import { Field } from "@headlessui/react";

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
      title="Approve Group Request"
    >
      <p className="p-2">
        Are you sure you want the user <b>{request.userFullName}</b> to join the
        group <b>{request.groupName}</b>?
      </p>
      <Field className="p-2">
        <Label>Motivation</Label>
        <Textarea className="iam-input" defaultValue={request.notes} disabled />
      </Field>
    </ConfirmModal>
  );
}
