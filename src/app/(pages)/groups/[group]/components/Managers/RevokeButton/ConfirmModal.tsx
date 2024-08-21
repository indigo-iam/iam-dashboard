import ConfirmModal from "@/components/ConfirmModal";
import { Group } from "@/models/groups";
import { ScimUser } from "@/models/scim";
import { revokeGroupManager } from "@/services/groups";

type ConfirmRevokeGroupManagerModal = {
  user: ScimUser;
  group: Group;
  show: boolean;
  onClose: () => void;
  onUnlinked?: () => void;
};

export default function ConfirmRevokeGroupManagerModal(
  props: Readonly<ConfirmRevokeGroupManagerModal>
) {
  const { user, group, show, onClose, onUnlinked } = props;

  const handleConfirm = async () => {
    await revokeGroupManager(group.id, user.id!);
    onClose();
    onUnlinked?.();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Remove Group Manager"
      title="Revoke Group Manager Privileges"
      onConfirm={handleConfirm}
    >
      Are you sure you want to revoke group manager privileges from user{" "}
      <b>{user.name?.formatted}</b> for group <b>{group.displayName}</b>?
    </ConfirmModal>
  );
}
