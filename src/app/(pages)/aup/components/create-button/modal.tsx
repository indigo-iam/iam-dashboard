// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { Form, Description, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { createAUP } from "@/services/aup";
import { Field } from "@headlessui/react";
import { useState } from "react";

interface CreateModalProps extends ModalProps {}

export default function CreateModal(props: Readonly<CreateModalProps>) {
  const { show, onClose } = props;
  const [validity, setValidity] = useState(0);
  const handleValidityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidity(Math.max(parseInt(event.currentTarget.value), 0));
  };
  const action = async (formData: FormData) => {
    const url = formData.get("url") as string;
    const signatureValidityInDays = parseInt(
      formData.get("validity") as string
    );
    const aupRemindersInDays = formData.get("reminders") as string | undefined;
    await createAUP({ url, signatureValidityInDays, aupRemindersInDays });
    onClose();
  };
  return (
    <Modal
      title="Create the Acceptable Usage Policy for this organization"
      show={show}
      onClose={onClose}
    >
      <Form action={action}>
        <ModalBody>
          <Field>
            <Label required>Acceptable Usage Policy URL</Label>
            <Input type="url" name="url" required />
            <Description>
              The URL above is presented to users at registration time or
              periodically if the AUP is configured for periodic re-acceptance.
            </Description>
          </Field>
          <Field>
            <Label required>AUP signature validity (in days)</Label>
            <Input
              type="number"
              name="validity"
              required
              onChange={handleValidityChange}
              value={validity}
            />
            <Description>
              If set to a positive value, users will be prompted periodically
              for an AUP signature (with the period defined in days). If set to
              zero, the AUP signature will be asked only at registration time.
            </Description>
          </Field>
          <Field hidden={validity <= 0}>
            <Label required>AUP reminders (in days)</Label>
            <Input
              type="text"
              name="reminders"
              placeholder="30,15,1"
              required={validity <= 0}
            />
            <Description>
              Indicate a sequence of three days representing how many days
              before the AUP expiration reminder messages must be sent.
            </Description>
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-tertiary" type="reset" onClick={onClose}>
            Cancel
          </Button>
          <Button className="btn-secondary" type="reset">
            Reset
          </Button>
          <Button className="btn-primary" type="submit">
            Create AUP
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
