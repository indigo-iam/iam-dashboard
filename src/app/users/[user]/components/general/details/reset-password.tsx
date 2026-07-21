// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "@/components/modal";
import { toast } from "@/components/toaster";
import { changePassword, resetUserPassword } from "@/services/users";
import { useState } from "react";

interface ModalPasswordProps extends ModalProps {
  userId: string;
}

function ModalPassword(props: Readonly<ModalPasswordProps>) {
  const { userId, ...modalProps } = props;
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await changePassword(userId, formData);
    toast.toast(res);
  }

  return (
    <Modal {...modalProps}>
      <ModalHeader onClose={modalProps.onClose}>Change password</ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody>
          <Field>
            <Label data-required>Current password</Label>
            <Input
              name="currentPassword"
              type="password"
              placeholder="Current password..."
              required
            />
          </Field>
          <Field>
            <Label data-required>New password</Label>
            <Input
              name="updatedPassword"
              type="password"
              placeholder="New password..."
              required
            />
          </Field>
          <Field>
            <Label data-required>Repeat password</Label>
            <Input type="password" placeholder="Repeat password..." required />
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-tertiary"
            type="reset"
            onClick={modalProps.onClose}
          >
            Cancel
          </Button>
          <Button className="btn-primary" type="submit">
            Change password
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

type ResetPasswordForUserModalProps = {
  userFormattedName: string;
  userEmail: string;
  show: boolean;
  onClose: () => void;
};

function ResetPasswordForUserModal(
  props: Readonly<ResetPasswordForUserModalProps>
) {
  const { userFormattedName, userEmail, show, onClose } = props;

  async function resetPassword() {
    const res = await resetUserPassword(userEmail);
    toast.toast(res);
  }

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      title="Reset user password"
      confirmButtonText="Reset password"
      onConfirm={resetPassword}
      danger
    >
      <p>
        {"Are you sure you want to send the reset password email to user "}
        <b>{userFormattedName}</b>
        {" at "}
        <i>{userEmail}</i>?
      </p>
    </ConfirmModal>
  );
}

type ResetPasswordProps = {
  userId: string;
  userFormattedName: string;
  userEmail: string;
  isMe: boolean;
};

export function ResetPassword(props: Readonly<ResetPasswordProps>) {
  const { userId, isMe, userFormattedName, userEmail } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-secondary" onClick={open}>
        {isMe ? "Change password" : "Reset password"}
      </Button>
      {isMe ? (
        <ModalPassword userId={userId} show={show} onClose={close} />
      ) : (
        <ResetPasswordForUserModal
          userFormattedName={userFormattedName}
          userEmail={userEmail}
          show={show}
          onClose={close}
        />
      )}
    </>
  );
}
