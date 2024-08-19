import ConfirmModal from "@/components/ConfirmModal";
import { Group } from "@/models/groups";
import { ScimReference } from "@/models/scim";
import { removeUserFromGroup } from "@/services/groups";

type ConfirmUnlinkUserModal = {
  user: ScimReference;
  group: Group;
  show: boolean;
  onClose: () => void;
  onUnlinked?: () => void;
};

export default function ConfirmUnlinkUserModal(
  props: Readonly<ConfirmUnlinkUserModal>
) {
  const { user, group, show, onClose, onUnlinked } = props;

  const handleConfirm = async () => {
    await removeUserFromGroup(group.id, user);
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
      Are you sure you want to remove <b>{user.display}</b> from group{" "}
      <b>{group.displayName}</b>?
    </ConfirmModal>
  );
}
