import { Button } from "@/components/Buttons";
import { Form } from "@/components/Form";
import Input from "@/components/Input";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import TextArea from "@/components/TextArea";
import { SSHKey } from "@/models/indigo-user";
import { ScimUser } from "@/models/scim";
import { addSSHKey } from "@/services/users";

interface AddSSHKeyModalProps extends ModalProps {
  user: ScimUser;
}

export default function AddSSHKeyModal(props: Readonly<AddSSHKeyModalProps>) {
  const { user, ...modalProps } = props;

  const action = async (formData: FormData) => {
    const sshKey: SSHKey = {
      display: formData.get("ssh-label") as string,
      value: formData.get("ssh-key") as string,
    };
    await addSSHKey(user.id!, sshKey);
    modalProps.onClose();
  };

  return (
    <Modal {...modalProps} title="Add SSH Key">
      <Form action={action}>
        <ModalBody>
          <Input
            id="ssh-label"
            name="ssh-label"
            title="Label"
            required={true}
          />
          <TextArea
            id="ssh-key"
            name="ssh-key"
            title="SSH Key"
            required={true}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="submit">Add SSH Key</Button>
          <Button type="reset" action="primary-outline">
            Reset Form
          </Button>
          <Button type="reset" onClick={modalProps.onClose} action="danger">
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
