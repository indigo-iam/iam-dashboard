import ConfirmModal from "@/components/confirm-modal";
import { Group } from "@/models/groups";
import { ScimReference } from "@/models/scim";
import { removeUserFromGroup } from "@/services/groups";

type ConfirmUnlinkUserModal = {
  userRef: ScimReference;
  group: Group;
  show: boolean;
  onClose: () => void;
};

export default function ConfirmUnlinkUserModal(
  props: Readonly<ConfirmUnlinkUserModal>
) {
  const { userRef, group, show, onClose } = props;

  const handleConfirm = async () => {
    await removeUserFromGroup(group.id, userRef);
    onClose();
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
      <b>{group.displayName}</b>?
    </ConfirmModal>
  );
}
