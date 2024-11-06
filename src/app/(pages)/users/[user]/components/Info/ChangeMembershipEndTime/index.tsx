import { Button } from "@/components/Buttons";
import Field from "@/components/Field";
import { Form } from "@/components/Form";
import { Input } from "@/components/Inputs";
import Label from "@/components/Label";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/Modal";
import { ScimUser } from "@/models/scim";
import {
  changeMembershipEndTime,
  revokeMembershipEndTime,
} from "@/services/users";

interface ChangeMembershipEndTimeModalProps extends ModalProps {
  user: ScimUser;
}

export function ChangeMembershipEndTimeModal(
  props: Readonly<ChangeMembershipEndTimeModalProps>
) {
  const { user } = props;
  const indigoUser = user["urn:indigo-dc:scim:schemas:IndigoUser"];
  const endTime = indigoUser?.endTime;
  const date = endTime
    ? new Date(endTime).toISOString().split("T")[0]
    : undefined;

  const action = async (formData: FormData) => {
    const stringDate = formData.get("membership-end-date") as string;
    const isoDate = new Date(stringDate).toISOString();
    await changeMembershipEndTime(user.id!, isoDate);
    props.onClose();
  };

  const revokeEndTime = async () => {
    await revokeMembershipEndTime(user.id!);
    props.onClose();
  };

  return (
    <Modal {...props} title="Change Membership End Time">
      <Form action={action}>
        <ModalBody>
          <Field>
            <Label>User End Time</Label>
            <Input name="membership-end-date" type="date" defaultValue={date} />
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" action="success">
            Change Membership End Time
          </Button>
          <Button type="button" action="danger-outline" onClick={revokeEndTime}>
            Revoke End Time
          </Button>
          <Button type="reset" action="primary-outline" onClick={props.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
