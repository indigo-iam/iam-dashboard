// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Button } from "@/components/buttons";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@/components/modal";
import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { linkOidcAccount } from "@/services/users";
import { toast } from "@/components/toaster";

type LinkAccountModalProps = ModalProps & {
  userId: string;
  userFormattedName: string;
};

function LinkAccountModal(props: Readonly<LinkAccountModalProps>) {
  const { show, onClose, userId, userFormattedName } = props;

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const issuer = formData.get("issuer") as string;
    const subject = formData.get("subject") as string;
    const res = await linkOidcAccount(userId, { issuer, subject });
    if (res.type === "success") {
      onClose();
    }
    toast.toast(res);
  }

  return (
    <Modal show={show} onClose={onClose}>
      <Form onSubmit={submit}>
        <ModalHeader onClose={onClose}>Link OpenID Connect account</ModalHeader>
        <ModalBody className="space-y-4 py-8">
          <p>
            Connected external OpenID Connect/OAuth2 provider to user{" "}
            <b>{userFormattedName}</b>
          </p>
          <Field>
            <Label data-required>Issuer</Label>
            <Input
              name="issuer"
              placeholder="https://auth.cern.ch/auth/realms/cern"
              required
            />
          </Field>
          <Field>
            <Label data-required>Subject</Label>
            <Input name="subject" placeholder="abc-12345-defg" required />
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-tertiary" type="reset">
            Cancel
          </Button>
          <Button className="btn-primary" type="submit">
            Link account
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

type LinkAccountButtonProps = {
  userId: string;
  userFormattedName: string;
};

export function LinkAccountButton(props: Readonly<LinkAccountButtonProps>) {
  const { userId, userFormattedName } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button className="btn-secondary" type="button" onClick={open}>
        <SquaresPlusIcon className="size-4" />
        Link account
      </Button>
      <LinkAccountModal
        show={show}
        onClose={close}
        userId={userId}
        userFormattedName={userFormattedName}
      />
    </>
  );
}
