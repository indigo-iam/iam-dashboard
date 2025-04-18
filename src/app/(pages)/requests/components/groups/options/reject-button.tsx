// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { Button } from "@/components/buttons";
import { GroupRequest } from "@/models/group-requests";
import { Modal, ModalBody, ModalFooter } from "@/components/modal";
import { useState } from "react";
import { Form } from "@/components/form";
import TextArea from "@/components/textarea";
import { rejectGroupRequest } from "@/services/group-requests";

type RejectButtonProps = {
  request: GroupRequest;
};

export default function RejectButton(props: Readonly<RejectButtonProps>) {
  const { request } = props;
  const [show, setShow] = useState(false);
  const [motivation, setMotivation] = useState<string>();
  const open = () => setShow(true);
  const close = () => setShow(false);
  const disabled = !(motivation && motivation.length > 3);

  const action = async (formData: FormData) => {
    const motivation = formData.get("motivation") as string;
    await rejectGroupRequest(request.uuid, motivation);
    close();
  };

  return (
    <>
      <button
        type="button"
        className="popover-option text-danger"
        onClick={open}
      >
        Reject Request
      </button>
      <Modal show={show} onClose={close} title="Reject Group Request">
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
              className="btn-tertiary"
              title="Cancel"
              type="reset"
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              className="btn-danger"
              title="Reject request"
              type="submit"
              disabled={disabled}
            >
              Reject request
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
