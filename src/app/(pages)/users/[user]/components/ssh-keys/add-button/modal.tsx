// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { Form, Field, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import TextArea from "@/components/textarea";
import { SSHKey } from "@/models/indigo-user";
import { User } from "@/models/scim";
import { addSSHKey } from "@/services/users";

interface AddSSHKeyModalProps extends ModalProps {
  user: User;
}

export default function AddSSHKeyModal(props: Readonly<AddSSHKeyModalProps>) {
  const { user, ...modalProps } = props;

  const action = async (formData: FormData) => {
    const sshKey: SSHKey = {
      display: formData.get("ssh-label") as string,
      value: formData.get("ssh-key") as string,
    };
    await addSSHKey(user.id, sshKey);
    modalProps.onClose();
  };

  return (
    <Modal {...modalProps} title="Add SSH Key">
      <Form action={action}>
        <ModalBody>
          <Field>
            <Label>Label</Label>
            <Input id="ssh-label" name="ssh-label" required={true} />
          </Field>
          <Field>
            <Label>SSH Key</Label>
            <TextArea
              id="ssh-key"
              name="ssh-key"
              title="SSH Key"
              required={true}
            />
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button type="reset" onClick={modalProps.onClose} action="danger">
            Cancel
          </Button>
          <Button type="reset" action="primary-outline">
            Reset Form
          </Button>
          <Button type="submit">Add SSH Key</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
