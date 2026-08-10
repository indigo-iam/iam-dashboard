// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "next/link";

import ConfirmModal from "@/components/confirm-modal";
import { Textarea } from "@/components/textarea";
import { toast } from "@/components/toaster";
import { Registration } from "@/models/registration";
import { approveRegistrationRequest } from "@/services/registration";
import { Notice } from "@/components/notices";

type ApproveRegistrationRequestModalProps = {
  request: Registration;
  show: boolean;
  onClose: () => void;
};

export default function ApproveRegistrationRequestModal(
  props: Readonly<ApproveRegistrationRequestModalProps>
) {
  const { request, show, onClose } = props;
  const action = async () => {
    const res = await approveRegistrationRequest(request.uuid);
    toast.toast(res);
    onClose();
  };
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      onConfirm={action}
      title="Approve user registration?"
      confirmButtonText="Approve user"
    >
      <div className="space-y-4">
        <p>Are you sure you want to add the user to this organization?</p>
        <Notice>
          <Link href={`/users/${request.uuid}`} className="iam-link">
            {`${request.givenname} ${request.familyname}`}
          </Link>
          <p className="text-sm">{request.email}</p>
        </Notice>
        <p> They provided the following motivation:</p>
      </div>
      <Textarea className="iam-input" defaultValue={request.notes} disabled />
    </ConfirmModal>
  );
}
