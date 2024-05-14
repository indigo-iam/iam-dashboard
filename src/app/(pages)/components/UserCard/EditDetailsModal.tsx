"use client";
import {
  Button,
  Modal,
  Form,
  Input,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "@/components";
import {
  ArrowUpTrayIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import type { Me } from "@/models/me";
import { patchMe } from "@/services/me";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const Body = (props: { me: Me }) => {
  const { me } = props;
  return (
    <ModalBody>
      <Input
        type="search"
        id="name"
        title="Name"
        name="givenName"
        placeholder={me?.name.givenName}
      />
      <Input
        type="search"
        id="surname"
        title="Surname"
        name="familyName"
        placeholder={me?.name.familyName}
      />
      <Input
        type="search"
        id="middleName"
        title="Middle Name"
        name="middleName"
        placeholder={me?.name.middleName}
      />
      <Input
        type="email"
        id="email"
        title="Email"
        name="email"
        placeholder={me?.emails[0].value}
      />
      <Input
        type="search"
        id="username"
        title="Username"
        name="username"
        placeholder={me?.userName}
        disabled={true}
      />
    </ModalBody>
  );
};

const Footer = (props: { canSubmit: boolean; onClose?: () => void }) => {
  const { canSubmit, onClose } = props;
  const { pending } = useFormStatus();

  return (
    <ModalFooter>
      <div className="flex justify-end p-2">
        <div className="col p-1">
          <Button
            className="my-auto"
            color="primary"
            icon={<ArrowUpTrayIcon />}
            type="submit"
            disabled={!canSubmit && !pending}
          >
            Update
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
    </ModalFooter>
  );
};

const EditDetailsForm = (props: { me: Me; onClose?: () => void }) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [formError, formAction] = useFormState(patchMe, undefined);

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    for (const value of formData.values()) {
      if (value) {
        setCanSubmit(true);
        return;
      }
    }
    setCanSubmit(false);
  };

  const handleReset = () => {
    setCanSubmit(false);
  };

  if (formError) {
    console.error(formError);
  }

  const { me, ...others } = props;
  const footerProps = { ...others, canSubmit };

  return (
    <Form
      action={async (formData: FormData) => {
        props.onClose?.();
        formAction(formData);
      }}
      id="edit-details-form"
      onChange={handleChange}
      onReset={handleReset}
    >
      <Body me={me} />
      <Footer {...footerProps} />
    </Form>
  );
};

export interface EditDetailsModalProps extends ModalProps {
  me: Me;
}

export const EditDetailsModal = (props: EditDetailsModalProps) => {
  const onClose = () => {
    const form = document.getElementById(
      "edit-details-form"
    ) as HTMLFormElement;
    form.reset();
    props.onClose?.();
  };
  const { me, ...modalProps } = { ...props, onClose };
  const formProps = { me, onClose };
  return (
    <Modal {...modalProps}>
      <EditDetailsForm {...formProps} />
    </Modal>
  );
};
