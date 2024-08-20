import ConfirmModal from "@/components/ConfirmModal";
import { ScimReference } from "@/models/scim";
import { removeUserFromGroup } from "@/services/groups";

type ConfirmUnlinkUserModal = {
  userRef: ScimReference;
  groupId: string;
  groupName: string;
  show: boolean;
  onClose: () => void;
  onUnlinked?: () => void;
};

export default function ConfirmUnlinkUserModal(
  props: Readonly<ConfirmUnlinkUserModal>
) {
  const { userRef, groupId, groupName, show, onClose, onUnlinked } = props;

  const handleConfirm = async () => {
    await removeUserFromGroup(groupId, userRef);
    onClose();
    onUnlinked?.();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Remove Membership"
      title="Remove User Membership"
      onConfirm={handleConfirm}
    >
      Are you sure you want to remove <b>{userRef.display}</b> from group{" "}
      <b>{groupName}</b>?
    </ConfirmModal>
  );
}
