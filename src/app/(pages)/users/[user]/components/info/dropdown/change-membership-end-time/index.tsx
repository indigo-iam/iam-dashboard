// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { Form, Field, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { User } from "@/models/scim";
import {
  changeMembershipEndTime,
  revokeMembershipEndTime,
} from "@/services/users";

interface ChangeMembershipEndTimeModalProps extends ModalProps {
  user: User;
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
    await changeMembershipEndTime(user.id, isoDate);
    props.onClose();
  };

  const revokeEndTime = async () => {
    await revokeMembershipEndTime(user.id);
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
          <Button className="btn-tertiary" type="reset" onClick={props.onClose}>
            Cancel
          </Button>
          <Button
            className="btn-danger-secondary"
            type="button"
            onClick={revokeEndTime}
          >
            Revoke End Time
          </Button>
          <Button className="btn-primary" type="submit">
            Change Membership End Time
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
