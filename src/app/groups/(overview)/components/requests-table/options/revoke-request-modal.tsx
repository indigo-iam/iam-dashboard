// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Note } from "@/components/notices";
import { GroupRequest } from "@/models/group-requests";
import { abortGroupRequest } from "@/services/group-requests";
import { dateToHuman } from "@/utils/dates";

interface RevokeRequestModalProps {
  userId: string;
  userFormattedName: string;
  request: GroupRequest;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
}
export default function RevokeRequestModal(
  props: Readonly<RevokeRequestModalProps>
) {
  const {
    userId, //
    userFormattedName,
    request,
    show,
    onClose,
    onDeleted,
  } = props;
  const sent = request.creationTime
    ? dateToHuman(new Date(request.creationTime))
    : "/NA";

  const handleConfirm = async () => {
    await abortGroupRequest(userId, request);
    onClose();
    onDeleted?.();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Revoke request"
      onConfirm={handleConfirm}
      title="Revoke group request"
      danger={true}
    >
      <div className="flex flex-col items-center gap-4">
        <p>Are you sure you want to revoke the following request?</p>
        {request.notes && (
          <Note>
            <div className="space-y-4">
              <p>
                User <b>{userFormattedName}</b> wants to join group{" "}
                <b>{request.groupName}</b> with the following motivation:{" "}
                <q className="italic">{request.notes}</q>
              </p>
              <p className="text-sm font-light">Sent {sent}</p>
            </div>
          </Note>
        )}
      </div>
    </ConfirmModal>
  );
}
