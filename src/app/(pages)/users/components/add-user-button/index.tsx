// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { ScimUser } from "@/models/scim";
import { addUser } from "@/services/users";
import { toTitleCase } from "@/utils/strings";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type AddUserFormProps = {
  onClose?: () => void;
  onUserAdded?: () => void;
};
function AddUserForm(props: Readonly<AddUserFormProps>) {
  const { onClose, onUserAdded } = props;
  const handleSubmit = async (formData: FormData) => {
    const firstName = toTitleCase(formData.get("name") as string);
    const surname = toTitleCase(formData.get("surname") as string);
    const email = formData.get("email") as string;
    const user: ScimUser = {
      userName: formData.get("username") as string,
      displayName: `${firstName} ${surname}`,
      name: {
        givenName: firstName,
        familyName: surname,
        middleName: "",
      },
      emails: [{ value: email, primary: true, type: "other" }],
      active: true,
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
    };
    addUser(user);
    onUserAdded?.();
    onClose?.();
  };
  return (
    <Form id="add-user-form" action={handleSubmit}>
      <p>Enter new user data.</p>
      <ModalBody>
        <Field>
          <Label data-required>First Name</Label>
          <Input
            type="text"
            name="name"
            title="Name"
            placeholder="First Name..."
            required
          />
        </Field>
        <Field>
          <Label data-required>Surname</Label>
          <Input
            type="text"
            name="surname"
            title="Surname"
            placeholder="Surname"
            required
          />
        </Field>
        <Field>
          <Label data-required>Username</Label>
          <Input
            type="text"
            name="username"
            title="Username"
            placeholder="Username"
            required
          />
        </Field>
        <Field>
          <Label data-required>Email</Label>
          <Input
            type="email"
            name="email"
            title="Email"
            placeholder="Email Name"
            required
          />
        </Field>
      </ModalBody>
      <ModalFooter>
        <Button className="btn-tertiary" type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button className="btn-secondary" type="reset">
          Reset
        </Button>
        <Button className="btn-primary" type="submit">
          Create User
        </Button>
      </ModalFooter>
    </Form>
  );
}

interface AddUserModalProps extends ModalProps {
  onUserAdded?: () => void;
}
function AddUserModal(props: Readonly<AddUserModalProps>) {
  const { onUserAdded, ...modalProps } = props;
  return (
    <Modal {...modalProps}>
      <AddUserForm onClose={modalProps.onClose} onUserAdded={onUserAdded} />
    </Modal>
  );
}

type AddUserProps = {
  onUserAdded?: () => void;
};
export default function AddUser(props: Readonly<AddUserProps>) {
  const { onUserAdded } = props;
  const [show, setShow] = useState(false);

  const open = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  return (
    <>
      <AddUserModal
        show={show}
        onClose={close}
        onUserAdded={onUserAdded}
        title="Add User"
      />
      <Button className="btn-secondary" onClick={open}>
        <UserPlusIcon className="my-auto size-5" />
        Add User
      </Button>
    </>
  );
}
