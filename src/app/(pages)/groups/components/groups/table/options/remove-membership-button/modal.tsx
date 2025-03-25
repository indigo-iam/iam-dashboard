import ConfirmModal from "@/components/confirm-modal";
import { ScimReference } from "@/models/scim";
import { removeUserFromGroup } from "@/services/groups";

type ConfirmUnlinkUserModal = {
  userRef: ScimReference;
  group: ScimReference;
  show: boolean;
  onClose: () => void;
};

export default function ConfirmUnlinkUserModal(
  props: Readonly<ConfirmUnlinkUserModal>
) {
  const { userRef, group, show, onClose } = props;

  const handleConfirm = async () => {
    await removeUserFromGroup(group.value, userRef);
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
      <b>{group.display}</b>?
    </ConfirmModal>
  );
}
