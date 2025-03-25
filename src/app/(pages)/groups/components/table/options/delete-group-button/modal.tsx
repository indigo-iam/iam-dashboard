import ConfirmModal from "@/components/confirm-modal";
import { Group } from "@/models/groups";
import { deleteGroup } from "@/services/groups";
import { makeScimReferenceFromGroup } from "@/utils/scim";

interface DeleteGroupModalProps {
  group: Group;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
}
export default function DeleteGroupModal(
  props: Readonly<DeleteGroupModalProps>
) {
  const { group, show, onClose, onDeleted } = props;
  const groupRef = makeScimReferenceFromGroup(group);

  const handleConfirm = async () => {
    await deleteGroup(groupRef.value);
    onClose();
    onDeleted?.();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete Group"
      onConfirm={handleConfirm}
      title="Delete Group"
      data-test="modal"
    >
      Are you sure you want to delete group <b>{groupRef?.display}</b>?
    </ConfirmModal>
  );
}
