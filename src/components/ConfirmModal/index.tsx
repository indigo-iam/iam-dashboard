import { Button } from "@/components/Buttons";
import { Form } from "@/components/Form";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";

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
        <ModalBody>
          <p className="py-2">{children}</p>
        </ModalBody>
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
