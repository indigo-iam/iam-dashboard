// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
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
      title="Add User"
    >
      <p>
        Are you sure you want to add the user{" "}
        <b>{`${request.givenname} ${request.familyname}`}?</b>
      </p>
      <p className="text-center">
        <i>{`"${request.notes}"`}</i>
      </p>
    </ConfirmModal>
  );
}
