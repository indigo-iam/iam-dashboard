import { Button } from "@/components/Buttons";
import Field from "@/components/Field";
import { Form } from "@/components/Form";
import { Input } from "@/components/Inputs";
import Label from "@/components/Label";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import { ScimUser } from "@/models/scim";
import { addAttribute } from "@/services/users";

interface AddAttributeModalProps extends ModalProps {
  user: ScimUser;
}

export default function AddAttributeModal(
  props: Readonly<AddAttributeModalProps>
) {
  const { user, ...modalProps } = props;
  const username = user.name?.formatted ?? "unknown user";

  const action = async (formData: FormData) => {
    const name = formData.get("attr-name") as string;
    const value = formData.get("attr-value") as string;
    await addAttribute(user.id!, { name, value });
    modalProps.onClose();
  };

  return (
    <Modal {...modalProps} title={`Set an attribute for user ${username}`}>
      <Form action={action}>
        <ModalBody>
          <div className="flex flex-row gap-2">
            <b>User</b>
            {username}
          </div>
          <Field>
            <Label> Attribute Name</Label>
            <Input
              id="attr-name"
              title="Attribute Name"
              name="attr-name"
              placeholder="Attribute Name..."
              required
            />
          </Field>
          <Field>
            <Label>Attribute Value</Label>
            <Input
              id="attr-value"
              title="Attribute Value"
              name="attr-value"
              placeholder="Attribute Value..."
              required
            />
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button action="danger" type="button" onClick={modalProps.onClose}>
            Cancel
          </Button>
          <Button action="primary-outline" type="reset">
            Reset
          </Button>
          <Button action="primary" type="submit">
            Add Attribute
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
