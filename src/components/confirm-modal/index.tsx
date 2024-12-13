import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";

interface ConfirmModal extends ModalProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

export default function ConfirmModal(props: Readonly<ConfirmModal>) {
  const {
    onConfirm,
    onCancel,
    children,
    cancelButtonText,
    confirmButtonText,
    ...modalProps
  } = props;

  const action = async () => {
    onConfirm?.();
  };

  const confirmText = confirmButtonText ?? "Confirm";
  const cancelText = cancelButtonText ?? "Cancel";

  return (
    <Modal {...modalProps}>
      <Form action={action}>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button action="danger" type="submit">
            {confirmText}
          </Button>
          <Button type="button" onClick={modalProps.onClose}>
            {cancelText}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
