// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Input } from "@/components/inputs";
import React, { useState } from "react";

interface ErrorMessages {
  currentPasswordErrorMessage?: string;
  passwordErrorMessage?: string;
  repeatPasswordErrorMessage?: string;
}

const minPasswordLength = 6;

function checkPassword(password: string) {
  if (password.length > 0 && password.length < minPasswordLength) {
    return `Password must be at least ${minPasswordLength} characters`;
  }
}

function checkRepeatPassword(updatedPassword: string, repeatPassword: string) {
  if (repeatPassword.length === 0) {
    return;
  }
  const passwordMismatchError = "Password doesn't match";
  let errorMessage = checkPassword(repeatPassword);
  if (updatedPassword !== repeatPassword) {
    errorMessage = errorMessage
      ? `${errorMessage}\n${passwordMismatchError}`
      : passwordMismatchError;
  }
  return errorMessage;
}

interface BodyProps extends ErrorMessages {}

const Body = (props: BodyProps) => {
  const {
    currentPasswordErrorMessage,
    passwordErrorMessage,
    repeatPasswordErrorMessage,
  } = props;
  return (
    <ModalBody>
      <Field>
        <Label>Current password</Label>
        <Input
          type="password"
          id="current-password"
          title="Current Password"
          name="currentPassword"
          placeholder="Type your current password"
        />
      </Field>
      <Field>
        <Label>New password</Label>
        <Input
          type="password"
          id="new-password"
          title="New Password"
          name="updatedPassword"
          placeholder="Type the new password"
        />
      </Field>
      <Field>
        <Label>Repeat new password</Label>
        <Input
          type="password"
          id="repeat-password"
          title="Repeat Password"
          name="repeatPassword"
          placeholder="Repeat the new password"
        />
      </Field>
    </ModalBody>
  );
};

const Footer = (props: { isValid: boolean; onClose?: () => void }) => {
  const { isValid, onClose } = props;
  return (
    <ModalFooter>
      <div className="justify-content-end flex gap-2">
        <Button className="btn-tertiary" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button className="btn-secondary" type="reset">
          Reset
        </Button>
        <Button className="btn-primary" disabled={!isValid}>
          Update Password
        </Button>
      </div>
    </ModalFooter>
  );
};

interface PasswordState {
  currentPassword: string;
  updatedPassword: string;
  repeatPassword: string;
}

const defaultPasswordState: PasswordState = {
  currentPassword: "",
  updatedPassword: "",
  repeatPassword: "",
};

export const ChangePasswordModal = (props: ModalProps) => {
  const [state, setState] = useState<PasswordState>(defaultPasswordState);
  const [currentPasswordErrorMessage, setCurrentPasswordErrorMessage] =
    useState<string | undefined>(undefined);
  const { currentPassword, updatedPassword, repeatPassword } = state;

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const inputElement = e.target as HTMLInputElement;
    const name = inputElement.name as
      | "currentPassword"
      | "updatedPassword"
      | "repeatPassword";

    state[name] = inputElement.value;
    setState({ ...state });
  };

  const handleReset = () => {
    setState(defaultPasswordState);
  };

  const handleClose = () => {
    const form = document.getElementById(
      "change-password-form"
    ) as HTMLFormElement;
    form.reset();
    props.onClose?.();
    setCurrentPasswordErrorMessage(undefined);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const response = await fetch("/iam/password-update", {
        method: "POST",
        body: formData,
      });
      const payload = await response.text();
      if (payload === "Wrong password provided") {
        setCurrentPasswordErrorMessage(payload);
        return;
      }
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  const passwordErrorMessage = checkPassword(updatedPassword);
  const repeatPasswordErrorMessage = checkRepeatPassword(
    updatedPassword,
    repeatPassword
  );
  const errors = {
    currentPasswordErrorMessage,
    passwordErrorMessage,
    repeatPasswordErrorMessage,
  };

  const isValid =
    !!currentPassword &&
    !!updatedPassword &&
    !!repeatPassword &&
    !errors.passwordErrorMessage &&
    !errors.repeatPasswordErrorMessage;

  const modalProps = { ...props, onClose: handleClose };

  return (
    <Modal {...modalProps} title="Change Password">
      <Form
        id="change-password-form"
        onChange={handleChange}
        onReset={handleReset}
        onSubmit={handleSubmit}
      >
        <Body {...errors} />
        <Footer isValid={isValid} onClose={handleClose} />
      </Form>
    </Modal>
  );
};
