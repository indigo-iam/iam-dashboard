// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";

interface ConfirmModal extends ModalProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
  cancelButtonText?: string;
  confirmButtonText?: string;
  "data-test"?: string;
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
          <Button
            className="btn-tertiary"
            type="button"
            onClick={modalProps.onClose}
          >
            {cancelText}
          </Button>
          <Button className="btn-primary" type="submit">
            {confirmText}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
