// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Modal, ModalBody, ModalFooter } from "@/components/modal";
import { Field, Form, Label } from "@/components/form";
import { Textarea } from "@/components/textarea";
import { GroupRequest } from "@/models/group-requests";
import { rejectGroupRequest } from "@/services/group-requests";
import { toaster } from "@/components/toaster";

type RejectRequestModalProps = {
  request: GroupRequest;
  show: boolean;
  onClose: () => void;
};

export default function RejectRequestModalProps(
  props: Readonly<RejectRequestModalProps>
) {
  const { request, show, onClose } = props;

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const motivation = formData.get("motivation") as string;
    const res = await rejectGroupRequest(request.uuid, motivation);
    toaster.send(res);
    onClose();
  }

  return (
    <Modal show={show} onClose={onClose} title="Reject group request">
      <Form onSubmit={submit}>
        <ModalBody>
          <p>
            Are you sure you want to delete the request to join the group{" "}
            <b>{request.groupName}</b> by the user <b>{request.userFullName}</b>
            ?
          </p>
          <div>
            <p className="text-sm">
              Optionally, write a motivation that will sent to the user.
            </p>
            <Field>
              <Label>Motivation</Label>
              <Textarea name="motivation" className="iam-input" required />
            </Field>
          </div>
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
          <Button className="btn-danger" title="Reject request" type="submit">
            Reject request
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
