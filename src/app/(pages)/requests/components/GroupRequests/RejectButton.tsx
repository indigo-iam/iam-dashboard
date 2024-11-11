"use client";
import { Button, DeleteButton } from "@/components/Buttons";
import { GroupRequest } from "@/models/group-requests";
import { Modal, ModalBody, ModalFooter } from "@/components/Modal";
import { useState } from "react";
import { Form } from "@/components/Form";
import TextArea from "@/components/TextArea";
import { rejectGroupRequest } from "@/services/group-requests";

type RejectButtonProps = {
  request: GroupRequest;
};

export default function RejectButton(props: Readonly<RejectButtonProps>) {
  const { request } = props;
  const [isModalShown, setIsModalShown] = useState(false);
  const [motivation, setMotivation] = useState<string>();
  const show = () => setIsModalShown(true);
  const hide = () => setIsModalShown(false);
  const disabled = !(motivation && motivation.length > 3);

  const action = async (formData: FormData) => {
    const motivation = formData.get("motivation") as string;
    await rejectGroupRequest(request.uuid, motivation);
    hide();
  };

  return (
    <>
      <DeleteButton title="Reject Group Request" onClick={show} />
      <Modal show={isModalShown} onClose={hide} title="Reject Group Request">
        <Form action={action}>
          <ModalBody>
            <p>
              Are you sure you want to delete the request to join the group{" "}
              <b>{request.groupName}</b> by the user{" "}
              <b>{request.userFullName}</b>?
            </p>
            <p>To proceed provide a motivation that will sent to the user:</p>
            <TextArea
              name="motivation"
              onChange={e => setMotivation(e.currentTarget.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              action="danger"
              title="Reject Request"
              type="submit"
              disabled={disabled}
            >
              Reject Request
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
