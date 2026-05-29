// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import Link from "next/link";

import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/modal";
import { Textarea } from "@/components/textarea";
import { Registration } from "@/models/registration";
import { rejectRegistrationRequest } from "@/services/registration";
import { toast } from "@/components/toaster";

type RejectRegistrationRequestModalProps = {
  request: Registration;
  show: boolean;
  onClose: () => void;
};

export default function RejectRegistrationRequestModal(
  props: Readonly<RejectRegistrationRequestModalProps>
) {
  const { request, show, onClose } = props;

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const motivation = formData.get("motivation") as string;
    const res = await rejectRegistrationRequest(request.uuid, motivation);
    toast.toast(res);
    onClose();
  }

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        Reject user registration request
      </ModalHeader>
      <Form id="reject-registration-form" onSubmit={submit}>
        <ModalBody>
          <p>
            Are you sure you want to delete the registration request for the
            user{" "}
            <Link href={`/users/${request.accountId}`} className="underline">
              <b>{`${request.givenname} ${request.familyname}`}</b> (
              <i>{request.email}</i>)
            </Link>
            ?
          </p>
          <p>To proceed provide a motivation that will be sent to the user:</p>
          <Field>
            <Label data-required>Motivation</Label>
            <Textarea name="motivation" className="iam-input" required />
          </Field>
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
          <Button className="btn-danger" type="submit">
            Reject request
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
