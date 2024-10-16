"use client";
import { Button } from "@/components/Buttons";
import { Form } from "@/components/Form";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import { Input } from "@/components/Inputs";
import {
  ArrowUpTrayIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import type { ScimUser } from "@/models/scim";
import { patchMe } from "@/services/me";
import React, { useState } from "react";

const Body = (props: { user: ScimUser }) => {
  const { user } = props;
  return (
    <ModalBody>
      <Input
        type="text"
        id="name"
        title="Name"
        name="givenName"
        defaultValue={user?.name?.givenName}
        minLength={2}
        maxLength={64}
        required
      />
      <Input
        type="text"
        id="surname"
        title="Surname"
        name="familyName"
        defaultValue={user?.name?.familyName}
        minLength={2}
        maxLength={64}
        required
      />
      <Input
        type="text"
        id="middleName"
        title="Middle Name"
        name="middleName"
        defaultValue={user?.name?.middleName}
      />
      <Input
        type="email"
        id="email"
        title="Email"
        name="email"
        defaultValue={user?.emails?.[0].value}
      />
      <Input
        type="text"
        id="username"
        title="Username"
        name="username"
        defaultValue={user?.userName}
        disabled={true}
      />
    </ModalBody>
  );
};

const Footer = (props: { canSubmit: boolean; onClose?: () => void }) => {
  const { canSubmit, onClose } = props;

  return (
    <ModalFooter>
      <div className="flex justify-end p-2">
        <div className="col p-1">
          <Button
            action="primary"
            icon={<ArrowUpTrayIcon />}
            type="submit"
            disabled={!canSubmit}
          >
            Update
          </Button>
        </div>
        <div className="col p-1">
          <Button action="warning" icon={<ArrowUturnLeftIcon />} type="reset">
            Reset
          </Button>
        </div>
        <div className="col p-1">
          <Button
            action="danger"
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

const EditDetailsForm = (props: { user: ScimUser; onClose?: () => void }) => {
  const [canSubmit, setCanSubmit] = useState(false);

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

  const { user, ...others } = props;
  const footerProps = { ...others, canSubmit };

  const action = async (formData: FormData) => {
    try {
      await patchMe(formData);
    } catch (err) {
      console.log("Patch failed because of an error:", err);
    }
  };

  return (
    <Form
      action={action}
      id="edit-details-form"
      onChange={handleChange}
      onReset={handleReset}
    >
      <Body user={user} />
      <Footer {...footerProps} />
    </Form>
  );
};

export interface EditDetailsModalProps extends ModalProps {
  user: ScimUser;
}

export const EditDetailsModal = (props: EditDetailsModalProps) => {
  const { user, ...modalProps } = props;
  const formProps = {
    user,
    onClose: () => {
      const form = document.getElementById(
        "edit-details-form"
      ) as HTMLFormElement;
      form.reset();
      props.onClose();
    },
  };
  return (
    <Modal {...modalProps} title="Edit User Details">
      <EditDetailsForm {...formProps} />
    </Modal>
  );
};
