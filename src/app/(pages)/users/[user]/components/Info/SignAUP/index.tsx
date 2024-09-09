import ConfirmModal from "@/components/ConfirmModal";
import { ModalProps } from "@/components/Modal";

interface SignAUPProps extends ModalProps {}

export function SignAUPModal(props: Readonly<SignAUPProps>) {
  return <ConfirmModal {...props} title="Sign AUP in behalf of the user" />;
}
