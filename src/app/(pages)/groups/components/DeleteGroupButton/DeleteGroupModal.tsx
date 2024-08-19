import ConfirmModal from "@/components/ConfirmModal";
import { ScimReference } from "@/models/scim";
import { deleteGroup } from "@/services/groups";

interface DeleteGroupModalProps {
  group: ScimReference;
  show: boolean;
  onClose: () => void;
  onDeleted?: () => void;
}
export default function DeleteGroupModal(
  props: Readonly<DeleteGroupModalProps>
) {
  const { group, show, onClose, onDeleted } = props;

  const handleConfirm = async () => {
    await deleteGroup(group.value);
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
    >
      Are you sure you want to delete group <b>{`${group?.display}`}</b>?
    </ConfirmModal>
  );
}
