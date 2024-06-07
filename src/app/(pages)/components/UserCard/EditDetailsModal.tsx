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
import { useRouter } from "next/navigation";

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

  return (
    <ModalFooter>
      <div className="flex justify-end p-2">
        <div className="col p-1">
          <Button
            className="my-auto"
            color="primary"
            icon={<ArrowUpTrayIcon />}
            type="submit"
            disabled={!canSubmit}
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
  const router = useRouter();

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

  const { me, ...others } = props;
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
  };
  const { me, ...modalProps } = { ...props, onClose };
  const formProps = { me, onClose };
  return (
    <Modal {...modalProps}>
      <EditDetailsForm {...formProps} />
    </Modal>
  );
};
