import ConfirmModal from "@/components/ConfirmModal";
import { ModalProps } from "@/components/Modal";

interface RequestAUPSignatureProps extends ModalProps {}

export function RequestAUPSignature(props: Readonly<RequestAUPSignatureProps>) {
  return <ConfirmModal {...props} title="Request AUP Signature" />;
}
