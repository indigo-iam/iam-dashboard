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
  autoclose?: boolean;
  danger?: boolean;
  formRef?: React.RefObject<HTMLFormElement | null>;
}

export default function ConfirmModal(props: Readonly<ConfirmModal>) {
  const {
    onConfirm,
    onCancel,
    children,
    cancelButtonText,
    confirmButtonText,
    confirmButtonDisabled,
    autoclose,
    danger,
    formRef,
    ...modalProps
  } = props;

  function submit() {
    if (autoclose !== false) {
      modalProps.onClose();
    }
    onConfirm?.();
  }

  const confirmText = confirmButtonText ?? "Confirm";
  const cancelText = cancelButtonText ?? "Cancel";

  return (
    <Modal {...modalProps}>
      <form ref={formRef} onSubmit={e => e.preventDefault()}>
        <ModalHeader>{modalProps.title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button
            variant="underline"
            type="reset"
            onClick={onCancel ?? modalProps.onClose}
          >
            {cancelText}
          </Button>
          <Button
            type="submit"
            accent={danger ? "danger" : "primary"}
            onClick={submit}
            disabled={confirmButtonDisabled}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
