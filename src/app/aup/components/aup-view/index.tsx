// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Form, Field, Label, Description } from "@/components/form";
import Link from "@/components/link";
import { AUP } from "@/models/aup";
import { dateToHuman } from "@/utils/dates";
import EditButton from "./edit-button";
import RequestSignatureButton from "./request-signature-button";
import DeleteButton from "./delete-button";

type AupViewProps = {
  aup: AUP;
};

export default function AupView(props: Readonly<AupViewProps>) {
  const { aup } = props;
  return (
    <>
      <Form className="space-y-2">
        <Field>
          <Label>Acceptable Usage Policy URL</Label>
          <p>
            <Link href={aup.url}>{aup.url}</Link>
          </p>
          <Description>
            The URL above is presented to users at registration time or
            periodically if the AUP is configured for periodic re-acceptance.
          </Description>
        </Field>
        <Field>
          <Label>Created</Label>
          <p>{dateToHuman(new Date(aup.creationTime))}</p>
        </Field>
        <Field>
          <Label>Last updated</Label>
          <p>{dateToHuman(new Date(aup.lastUpdateTime))}</p>
        </Field>
        <Field>
          <Label>Signature Validity (in days)</Label>
          <p>{aup.signatureValidityInDays}</p>
          <Description>
            If set to a positive value, users will be prompted periodically for
            an AUP signature (with the period defined in days). If set to zero,
            the AUP signature will be asked only at registration time.
          </Description>
        </Field>
        <Field>
          <Label>AUP Reminders (in days)</Label>
          <p>{aup.aupRemindersInDays}</p>
          <Description>
            Indicate a sequence of three days representing how many days before
            the AUP expiration reminder messages must be sent.
          </Description>
        </Field>
      </Form>
      <div className="flex flex-row gap-2">
        <EditButton aup={aup} />
        <RequestSignatureButton />
        <DeleteButton />
      </div>
    </>
  );
}
