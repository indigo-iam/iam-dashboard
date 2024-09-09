import ConfirmModal from "@/components/ConfirmModal";
import { ModalProps } from "@/components/Modal";

interface AssignAdminModalProps extends ModalProps {}

export function AssignAdminModal(props: Readonly<AssignAdminModalProps>) {
  return <ConfirmModal {...props} title="Assign Admin Privileges" />;
}
