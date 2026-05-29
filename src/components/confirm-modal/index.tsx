// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalProps,
  ModalBody,
} from "@/components/modal";

interface ConfirmModal extends ModalProps {
  title?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
  cancelButtonText?: string;
  confirmButtonText?: string;
  confirmButtonDisabled?: boolean;
  danger?: boolean;
}

export default function ConfirmModal(props: Readonly<ConfirmModal>) {
  const {
    onConfirm,
    onCancel,
    children,
    cancelButtonText,
    confirmButtonText,
    confirmButtonDisabled,
    danger,
    ...modalProps
  } = props;

  async function submit() {
    modalProps.onClose();
    onConfirm?.();
  }

  const confirmText = confirmButtonText ?? "Confirm";
  const cancelText = cancelButtonText ?? "Cancel";

  return (
    <Modal {...modalProps}>
      <ModalHeader onClose={modalProps.onClose}>{modalProps.title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button
          className="btn-tertiary"
          type="button"
          onClick={onCancel ?? modalProps.onClose}
        >
          {cancelText}
        </Button>
        <Button
          className="btn-primary data-[danger=true]:btn-danger"
          type="submit"
          data-danger={danger}
          onClick={submit}
          disabled={confirmButtonDisabled}
        >
          {confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
