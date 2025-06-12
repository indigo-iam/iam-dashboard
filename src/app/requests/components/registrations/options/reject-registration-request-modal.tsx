// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { Form, Label } from "@/components/form";
import { Modal, ModalBody, ModalFooter } from "@/components/modal";
import { Textarea } from "@/components/textarea";
import { Registration } from "@/models/registration";
import { rejectRegistrationRequest } from "@/services/registration";

type RejectRegistrationRequestModalProps = {
  request: Registration;
  show: boolean;
  onClose: () => void;
};

export default function RejectRegistrationRequestModal(
  props: Readonly<RejectRegistrationRequestModalProps>
) {
  const { request, show, onClose } = props;

  const action = async (formData: FormData) => {
    const motivation = formData.get("motivation") as string;
    await rejectRegistrationRequest(request.uuid, motivation);
    onClose();
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Reject user registration request"
    >
      <Form action={action} id="reject-registration-form">
        <ModalBody>
          <p>
            Are you sure you want to delete the registration request for the
            user <b>{`${request.givenname} ${request.familyname}`}</b>?
          </p>
          <p>To proceed provide a motivation that will be sent to the user:</p>
          <Label data-required>Motivation</Label>
          <Textarea name="motivation" className="textarea" required />
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-tertiary"
            title="Cancel"
            type="reset"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="btn-danger" title="Reject user" type="submit">
            Reject user
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
