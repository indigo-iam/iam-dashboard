"use client";
import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { Modal, ModalBody, ModalFooter } from "@/components/modal";
import TextArea from "@/components/textarea";
import { Registration } from "@/models/registration";
import { rejectRegistrationRequest } from "@/services/registration";
import { useState } from "react";

type RejectButtonProps = {
  request: Registration;
};

export default function RejectButton(props: Readonly<RejectButtonProps>) {
  const { request } = props;
  const [isModalShown, setIsModalShown] = useState(false);
  const [motivation, setMotivation] = useState<string>();
  const show = () => setIsModalShown(true);
  const hide = () => setIsModalShown(false);

  const action = async (formData: FormData) => {
    const motivation = formData.get("motivation") as string;
    await rejectRegistrationRequest(request.uuid, motivation);
    hide();
  };

  const disabled = !(motivation && motivation.length > 3);

  return (
    <>
      <button
        type="button"
        className="popover-option text-danger"
        onClick={show}
      >
        Reject User
      </button>
      <Modal
        show={isModalShown}
        onClose={hide}
        title="Reject user registration request"
      >
        <Form action={action} id="reject-registration-form">
          <ModalBody>
            <p>
              Are you sure you want to delete the registration request for the
              user <b>{`${request.givenname} ${request.familyname}`}</b>?
            </p>
            <p>
              To proceed provide a motivation that will be sent to the user:
            </p>
            <TextArea
              name="motivation"
              onChange={e => setMotivation(e.currentTarget.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              action="danger"
              title="Reject User"
              type="submit"
              disabled={disabled}
            >
              Reject User
            </Button>
            <Button action="primary" title="Cancel" type="reset" onClick={hide}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
