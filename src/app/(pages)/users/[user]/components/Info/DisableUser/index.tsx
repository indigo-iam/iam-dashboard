import ConfirmModal from "@/components/ConfirmModal";
import { ModalProps } from "@/components/Modal";

interface DisableUserProps extends ModalProps {}

export function DisableUser(props: Readonly<DisableUserProps>) {
  return <ConfirmModal {...props} title="Disable User" />;
}
