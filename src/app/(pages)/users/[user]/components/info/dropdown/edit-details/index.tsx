// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Input } from "@/components/inputs";
import {
  ArrowUpTrayIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import type { User } from "@/models/scim";
import { patchMe } from "@/services/me";
import React, { useState } from "react";

const Body = (props: { user: User }) => {
  const { user } = props;
  return (
    <ModalBody>
      <Input
        type="text"
        id="name"
        title="Name"
        name="givenName"
        placeholder="Name"
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
        placeholder="Family Name"
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
        placeholder="Middle Name"
        defaultValue={user?.name?.middleName}
      />
      <Input
        type="email"
        id="email"
        title="Email"
        name="email"
        placeholder="Email"
        defaultValue={user?.emails?.[0].value}
        required
      />
      <Input
        type="text"
        id="username"
        title="Username"
        name="username"
        placeholder="Username"
        defaultValue={user?.userName}
        disabled={true}
        required
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

const EditDetailsForm = (props: { user: User; onClose?: () => void }) => {
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
      const resp = await patchMe(formData);
      if (resp?.err) {
        alert(resp.err);
      } else {
        props.onClose?.();
      }
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
  user: User;
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
