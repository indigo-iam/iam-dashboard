// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import InfoTable from "@/components/info-table";
import { GroupRequest } from "@/models/group-requests";
import { User } from "@/models/scim";
import { abortGroupRequest } from "@/services/group-requests";

type DeleteGroupRequestModalProps = {
  user: User;
  isMe: boolean;
  groupRequest: GroupRequest;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
};

export default function DeleteGroupRequestModal(
  props: Readonly<DeleteGroupRequestModalProps>
) {
  const { user, isMe, groupRequest, show, onClose, onDeleted } = props;
  const handleConfirm = async () => {
    abortGroupRequest(isMe ? "me" : user.id, groupRequest);
    onClose();
    onDeleted?.();
  };
  const data = [
    { name: "Group Name", value: groupRequest.groupName },
    { name: "Group ID", value: groupRequest.groupUuid },
  ];
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete Request"
      title="Delete Group Request"
      onConfirm={handleConfirm}
    >
      <p>The following group request will be removed</p>
      <InfoTable className="mt-2" data={data} />
    </ConfirmModal>
  );
}
