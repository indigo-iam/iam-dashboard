// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "next/link";

import ConfirmModal from "@/components/confirm-modal";
import { Textarea } from "@/components/textarea";
import { Registration } from "@/models/registration";
import { approveRegistrationRequest } from "@/services/registration";

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
    await approveRegistrationRequest(request.uuid);
    onClose();
  };
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      onConfirm={action}
      title="Approve user registration"
      confirmButtonText="Approve user"
    >
      <p>
        Are you sure you want to add the user{" "}
        <Link href={`/users/${request.uuid}`} className="underline">
          <b>{`${request.givenname} ${request.familyname}`}</b> (
          <i>{request.email}</i>)
        </Link>
        ?<br />
        They provided the following motivation:
      </p>
      <Textarea className="iam-input" defaultValue={request.notes} disabled />
    </ConfirmModal>
  );
}
