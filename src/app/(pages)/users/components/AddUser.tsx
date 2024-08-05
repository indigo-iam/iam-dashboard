"use client";
import Button from "@/components/Button";
import { Form } from "@/components/Form";
import Input from "@/components/Input";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import { ScimUser } from "@/models/scim";
import { addUser } from "@/services/users";
import { toTitleCase } from "@/utils/strings";
import { UserIcon } from "@heroicons/react/24/outline";
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
      <ModalBody>
        <Input
          type="text"
          name="name"
          title="Name"
          placeholder="First Name"
          required
        />
        <Input
          type="text"
          name="surname"
          title="Surname"
          placeholder="Surname"
          required
        />
        <Input
          type="text"
          name="username"
          title="Username"
          placeholder="Username"
          required
        />
        <Input
          type="email"
          name="email"
          title="Email"
          placeholder="Email Name"
          required
        />
      </ModalBody>
      <ModalFooter>
        <Button type="submit">Create User</Button>
        <Button type="reset">Reset</Button>
        <Button type="reset" onClick={onClose}>
          Cancel
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
      <Button icon={<UserIcon />} onClick={open}>
        Add User
      </Button>
    </>
  );
}
