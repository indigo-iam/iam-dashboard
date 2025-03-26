// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Form, Field, Description, Label } from "@/components/form";
import { Modal, ModalBody, ModalFooter, ModalProps } from "@/components/modal";
import { Input } from "@/components/inputs";
import { Button } from "@/components/buttons";
import { AUP } from "@/models/aup";
import { patchAUP } from "@/services/aup";

interface EditModalProps extends ModalProps {
  aup: AUP;
}

export default function EditModal(props: Readonly<EditModalProps>) {
  const { show, onClose, aup } = props;
  const action = async (formData: FormData) => {
    const url = formData.get("url") as string;
    const signatureValidityInDays = parseInt(
      formData.get("validity") as string
    );
    const aupRemindersInDays = formData.get("reminders") as string;
    await patchAUP({ url, signatureValidityInDays, aupRemindersInDays });
    onClose();
  };

  return (
    <Modal
      title="Edit the Acceptable Usage Policy for this organization"
      show={show}
      onClose={onClose}
    >
      <Form action={action}>
        <ModalBody>
          <Field>
            <Label required>Accept Usage Policy URL</Label>
            <Input name="url" type="url" defaultValue={aup.url} required />
            <Description>
              The URL above is presented to users at registration time or
              periodically if the AUP is configured for periodic re-acceptance.
            </Description>
          </Field>
          <Field>
            <Label required>AUP signature validity (in days)</Label>
            <Input
              name="validity"
              type="text"
              defaultValue={aup.signatureValidityInDays}
              required
            />
            <Description>
              If set to a positive value, users will be prompted periodically
              for an AUP signature (with the period defined in days). If set to
              zero, the AUP signature will be asked only at registration time.
            </Description>
          </Field>
          <Field>
            <Label required>AUP signature reminders (in days)</Label>
            <Input
              name="reminders"
              type="text"
              defaultValue={aup.aupRemindersInDays}
              required
            />
            <Description>
              Indicate a sequence of comma-separated numbers representing how
              many days before the AUP expiration reminder messages must be
              sent.
            </Description>
          </Field>
          <section>
            <p className="py-2 text-primary-light">
              Editing the AUP will <b>not</b> trigger an AUP signature request
            </p>
            <p className="text-xs">
              If you want to request a signature from users for the updated AUP,
              use the &quotRequest AUP signature&quot button in the AUP
              management page.
            </p>
          </section>
        </ModalBody>
        <ModalFooter>
          <Button type="submit">Confirm</Button>
          <Button type="reset" action="primary-outline">
            Reset
          </Button>
          <Button type="reset" action="danger-outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
