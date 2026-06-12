// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Form, Description, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "@/components/modal";
import { toast } from "@/components/toaster";
import { createAUP } from "@/services/aup";
import { Field } from "@headlessui/react";
import { useState } from "react";

interface CreateModalProps extends ModalProps {}

export default function CreateModal(props: Readonly<CreateModalProps>) {
  const { show, onClose } = props;
  const [url, setUrl] = useState<string | undefined>();
  const [validity, setValidity] = useState<number | undefined>(0);

  function handleUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUrl(event.currentTarget.value);
  }

  function handleValidityChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValidity(parseInt(event.currentTarget.value));
  }

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = formData.get("url") as string;
    const signatureValidityInDays = parseInt(
      formData.get("validity") as string
    );
    const aupRemindersInDays = formData.get("reminders") as string | undefined;
    const res = await createAUP({
      url,
      signatureValidityInDays,
      aupRemindersInDays,
    });
    toast.toast(res);
    onClose();
  }

  function reset() {
    setUrl(undefined);
    setValidity(0);
  }

  function cancel() {
    reset();
    onClose();
  }
  const formIsValid = url && validity !== undefined && !isNaN(validity);

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        Create the Acceptable Usage Policy for this organization
      </ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody>
          <Field>
            <Label data-required>Acceptable Usage Policy URL</Label>
            <Input type="url" name="url" required onChange={handleUrlChange} />
            <Description>
              The URL above is presented to users at registration time or
              periodically if the AUP is configured for periodic re-acceptance.
            </Description>
          </Field>
          <Field>
            <Label data-required>AUP signature validity (in days)</Label>
            <Input
              name="validity"
              type="number"
              defaultValue={0}
              min={0}
              onChange={handleValidityChange}
            />
            <Description>
              If set to a positive value, users will be prompted periodically
              for an AUP signature (with the period defined in days). If set to
              zero, the AUP signature will be asked only at registration time.
            </Description>
          </Field>
          {validity !== undefined && validity > 0 && (
            <Field>
              <Label data-required>AUP reminders (in days)</Label>
              <Input
                type="text"
                name="reminders"
                placeholder="30,15,1"
                required
              />
              <Description>
                Indicate a sequence of three days representing how many days
                before the AUP expiration reminder messages must be sent.
              </Description>
            </Field>
          )}
        </ModalBody>
        <ModalFooter>
          <Button className="btn-tertiary" type="reset" onClick={cancel}>
            Cancel
          </Button>
          <Button className="btn-secondary" type="reset" onClick={reset}>
            Reset
          </Button>
          <Button className="btn-primary" type="submit" disabled={!formIsValid}>
            Create AUP
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
