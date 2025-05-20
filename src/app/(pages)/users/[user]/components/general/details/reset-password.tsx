// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { User } from "@/models/scim";
import { changePassword } from "@/services/users";
import { useState } from "react";

interface ModalPasswordProps extends ModalProps {
  user: User;
}

function ModalPassword(props: Readonly<ModalPasswordProps>) {
  const { user, ...modalProps } = props;
  const action = async (formData: FormData) => {
    await changePassword(user, formData);
  };
  return (
    <Modal {...modalProps}>
      <Form action={action}>
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
            className="tertiary"
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

type ResetPasswordProps = {
  user: User;
};

export function ResetPassword(props: Readonly<ResetPasswordProps>) {
  const { user } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-secondary" onClick={open}>
        Reset password
      </Button>
      <ModalPassword
        user={user}
        show={show}
        onClose={close}
        title="Change password"
      />
    </>
  );
}
