import ConfirmModal from "@/components/ConfirmModal";
import { ModalProps } from "@/components/Modal";
import { User } from "@/models/scim";
import { signAUP } from "@/services/users";

interface SignAUPProps extends ModalProps {
  user: User;
}

export function SignAUPModal(props: Readonly<SignAUPProps>) {
  const { user } = props;
  const action = async () => {
    signAUP(user.id);
    props.onClose();
  };

  return (
    <ConfirmModal
      {...props}
      title="Sign AUP in behalf of the user"
      onConfirm={action}
    >
      Are you sure you want to sign the AUP on behalf of the user{" "}
      <b>{user.displayName}</b>?
    </ConfirmModal>
  );
}
