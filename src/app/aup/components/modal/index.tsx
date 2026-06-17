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
import { AUP } from "@/models/aup";
import { createAUP, patchAUP } from "@/services/aup";
import { Field } from "@headlessui/react";
import { useState } from "react";

interface AupModalProps extends ModalProps {
  aup?: AUP;
}

export default function AupModal(props: Readonly<AupModalProps>) {
  const { show, onClose, aup } = props;
  const [url, setUrl] = useState<string | undefined>(aup?.url);
  const [validity, setValidity] = useState<number | undefined>(0);
  const isEditing = !!aup;

  function handleUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUrl(event.currentTarget.value);
  }

  function handleValidityChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValidity(Number.parseInt(event.currentTarget.value));
  }

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = formData.get("url") as string;
    const signatureValidityInDays = Number.parseInt(
      formData.get("validity") as string
    );
    const aupRemindersInDays =
      (formData.get("reminders") as string | undefined) ?? "";
    const body = {
      url,
      signatureValidityInDays,
      aupRemindersInDays,
    };
    const res = isEditing ? await patchAUP(body) : await createAUP(body);
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
  const formIsValid = url && validity !== undefined && !Number.isNaN(validity);

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        {isEditing
          ? "Edit AUP for this organization"
          : "Create the Acceptable Usage Policy for this organization"}
      </ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody>
          <Field>
            <Label data-required>Acceptable Usage Policy URL</Label>
            <Input
              type="url"
              name="url"
              required
              defaultValue={aup?.url}
              onChange={handleUrlChange}
            />
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
              required
              defaultValue={aup?.signatureValidityInDays ?? 0}
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
                defaultValue={aup?.aupRemindersInDays}
                required
              />
              <Description>
                Indicate a sequence of three days representing how many days
                before the AUP expiration reminder messages must be sent.
              </Description>
            </Field>
          )}
          {isEditing && (
            <section>
              <p className="text-md py-2 text-gray-500 dark:text-white/75">
                Editing the AUP will <b>not</b> trigger an AUP signature request
              </p>
              <p className="text-xs text-gray-500 dark:text-white/60">
                If you want to request a signature from users for the updated
                AUP, use the &quot;Request AUP signature&quot; button in the AUP
                management page.
              </p>
            </section>
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
            {aup ? "Confirm" : "Create AUP"}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
