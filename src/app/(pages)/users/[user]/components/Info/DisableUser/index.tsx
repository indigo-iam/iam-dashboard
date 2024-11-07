import ConfirmModal from "@/components/ConfirmModal";
import { ModalProps } from "@/components/Modal";
import { User } from "@/models/scim";
import { changeUserStatus} from "@/services/users";

interface DisableUserProps extends ModalProps {
  user: User;
}

export function DisableUser(props: Readonly<DisableUserProps>) {
  const { user } = props;

  const isActive = user.active ?? false;
  const action = async () => {
    changeUserStatus(user.id, !isActive);
    props.onClose();
  };

  return (
    <ConfirmModal
      {...props}
      title={`${isActive ? "Disable" : "Enable"} User`}
      onConfirm={action}
    >
      Do you want to want to {isActive ? "disable" : "enable"} the user{" "}
      <b>{user.displayName}</b>?
    </ConfirmModal>
  );
}
