// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { GroupRequest } from "@/models/group-requests";
import { User } from "@/models/scim";
import { abortGroupRequest } from "@/services/group-requests";
import { dateToHuman } from "@/utils/dates";
import { ClockIcon } from "@heroicons/react/24/outline";

interface RevokeRequestModalProps {
  user: User;
  request: GroupRequest;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
}
export default function RevokeRequestModal(
  props: Readonly<RevokeRequestModalProps>
) {
  const { user, request, show, onClose, onDeleted } = props;
  const sent = request.creationTime
    ? dateToHuman(new Date(request.creationTime))
    : "/NA";

  const handleConfirm = async () => {
    await abortGroupRequest(user.id, request);
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
      <div>
        <p>Are you sure you want to revoke request for group</p>
        <div>
          <p className="font-bold">{request.groupName}</p>
        </div>
        {request.notes && (
          <p>
            <span>Motivation: </span>
            <span className="italic">{request.notes}</span>
          </p>
        )}
        <p className="flex items-center gap-1">
          <ClockIcon className="size-4" />
          <span>Sent {sent}</span>
        </p>
      </div>
    </ConfirmModal>
  );
}
