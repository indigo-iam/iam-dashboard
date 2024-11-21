import ConfirmModal from "@/components/ConfirmModal";
import { ModalProps } from "@/components/Modal";
import { User } from "@/models/scim";
import { changeUserStatus } from "@/services/users";

interface ToggleUserModalProps extends ModalProps {
  user: User;
}

export default function ToggleUserStatusModal(
  props: Readonly<ToggleUserModalProps>
) {
  const { user, show, onClose } = props;
  const action = async () => {
    const newStatus = !(user.active ?? false);
    console.log(newStatus);
    await changeUserStatus(user.id, newStatus);
    onClose();
  };
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      title={user.active ? "Disable User" : "Enable User"}
      onConfirm={action}
    >
      <p>
        Are you sure you want to <b>{user.active ? "disable" : "enable"}</b> the
        user <b>{user.displayName}</b>?
      </p>
    </ConfirmModal>
  );
}
