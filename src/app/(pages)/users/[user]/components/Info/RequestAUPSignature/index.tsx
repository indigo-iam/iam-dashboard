import ConfirmModal from "@/components/ConfirmModal";
import { ModalProps } from "@/components/Modal";
import { User } from "@/models/scim";
import { requestAUPSignature } from "@/services/users";

interface RequestAUPSignatureProps extends ModalProps {
  user: User;
}

export function RequestAUPSignature(props: Readonly<RequestAUPSignatureProps>) {
  const { user } = props;
  const action = async () => {
    await requestAUPSignature(user.id);
    props.onClose();
  };
  return (
    <ConfirmModal {...props} title="Request AUP Signature" onConfirm={action}>
      Do you want the user <b>{user.displayName}</b> to (re)sign the AUP?
    </ConfirmModal>
  );
}
