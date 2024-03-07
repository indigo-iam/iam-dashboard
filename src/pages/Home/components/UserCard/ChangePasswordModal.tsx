import {
  Button,
  Modal,
  Form,
  Input,
  ModalProps,
  ModalBody,
  ModalFooter,
} from "@components";
import {
  ArrowUpTrayIcon,
  ArrowUturnLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useMe } from "@services/Me";
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
  const passwordMismatch = "Password doesn't match";
  let errorMessage = checkPassword(repeatPassword);
  if (updatedPassword !== repeatPassword) {
    errorMessage = errorMessage
      ? `${errorMessage}\n${passwordMismatch}`
      : passwordMismatch;
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
      <Input
        type="password"
        id="current-password"
        title="Current Password"
        name="currentPassword"
        errorMessage={currentPasswordErrorMessage}
      />
      <Input
        type="password"
        id="new-password"
        title="New Password"
        name="updatedPassword"
        errorMessage={passwordErrorMessage}
      />
      <Input
        type="password"
        id="repeat-password"
        title="Repeat Password"
        errorMessage={repeatPasswordErrorMessage}
        name="repeatPassword"
      />
    </ModalBody>
  );
};

const Footer = (props: { isValid: boolean; onClose?: () => void }) => {
  const { isValid, onClose } = props;
  return (
    <ModalFooter>
      <div className="d-flex justify-content-end p-2">
        <div className="row">
          <div className="col p-1">
            <Button
              className="my-auto"
              color="primary"
              icon={<ArrowUpTrayIcon />}
              disabled={!isValid}
            >
              Update Password
            </Button>
          </div>
          <div className="col p-1">
            <Button
              className="my-auto"
              color="warning"
              icon={<ArrowUturnLeftIcon />}
              type="reset"
            >
              Reset
            </Button>
          </div>
          <div className="col p-1">
            <Button
              className="my-auto"
              color="danger"
              onClick={onClose}
              icon={<XMarkIcon />}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </div>
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

  const { updatePassword } = useMe();

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
      const response = await updatePassword(new FormData(form));
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
    <Modal {...modalProps}>
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
