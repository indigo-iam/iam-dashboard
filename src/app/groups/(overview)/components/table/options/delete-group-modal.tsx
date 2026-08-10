// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Notice, Warning } from "@/components/notices";
import { toast } from "@/components/toaster";
import { deleteGroup } from "@/services/groups";

interface DeleteGroupModalProps {
  groupId: string;
  groupName: string;
  groupDescription?: string | null;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
}
export default function DeleteGroupModal(
  props: Readonly<DeleteGroupModalProps>
) {
  const { groupId, groupName, groupDescription, show, onClose, onDeleted } =
    props;

  async function handleConfirm() {
    const response = await deleteGroup(groupId);
    toast.toast(response);
    onClose();
    onDeleted?.();
  }

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete"
      onConfirm={handleConfirm}
      title={`Delete group '${groupName}'?`}
      danger={true}
    >
      <div className="space-y-4">
        <p>Are you sure you want to delete the following group?</p>
        <Notice>
          <p>
            <b>{groupName}</b>
          </p>
          {groupDescription && (
            <p>
              <i>{groupDescription}</i>
            </p>
          )}
        </Notice>
        {/* prettier-ignore */}
        <Warning>
          Members of this group would would be not able to access group&apos;s
          resources anymore.{" "}
          <b>This action can not be undone</b>.
        </Warning>
      </div>
    </ConfirmModal>
  );
}
