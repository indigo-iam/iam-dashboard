// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalProps,
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

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onConfirm?.();
  }

  const confirmText = confirmButtonText ?? "Confirm";
  const cancelText = cancelButtonText ?? "Cancel";

  return (
    <Modal {...modalProps}>
      <ModalHeader onClose={modalProps.onClose}>{modalProps.title}</ModalHeader>
      <Form onSubmit={submit}>
        {children}
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
            onClick={modalProps.onClose}
            disabled={confirmButtonDisabled}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
