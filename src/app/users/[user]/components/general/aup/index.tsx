// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { AUP } from "@/models/aup";
import { User } from "@/models/scim";
import { fetchAUP } from "@/services/aup";
import { dateToHuman, getDate } from "@/utils/dates";
import { RequestSignature } from "./request-signature";

async function getExpirationDate(user: User, aup: AUP) {
  const aupSignatureTime =
    user["urn:indigo-dc:scim:schemas:IndigoUser"]?.aupSignatureTime;
  if (!aupSignatureTime) {
    return {
      expiresAt: "N/A",
      expired: false,
    };
  }
  const aupExpirationDate = new Date(aupSignatureTime);
  aupExpirationDate.setDate(
    aupExpirationDate.getDate() + aup.signatureValidityInDays
  );
  const expiresAt = dateToHuman(aupExpirationDate);
  const expired = aupExpirationDate < getDate();
  return {
    expiresAt: expired ? `Expired ${expiresAt}` : `Expires ${expiresAt}`,
    expired,
  };
}

type AupProps = {
  user: User;
  isMe: boolean;
};

export async function Aup(props: Readonly<AupProps>) {
  const { user, isMe } = props;
  const aup = await fetchAUP();
  if (!aup) {
    return null;
  }
  const { expiresAt, expired } = await getExpirationDate(user, aup);
  return (
    <div className="flex flex-col gap-8 py-4 last:pb-0 lg:flex-row">
      <div className="w-full text-sm font-light text-gray-200 lg:w-1/3 dark:text-gray-300/80">
        <h5 className="py-1 font-semibold text-gray-500 dark:text-gray-300">
          Acceptable Usage Policy
        </h5>
        <p className="whitespace-normal">
          Curabitur id libero vehicula, molestie lorem a, tempor tellus.
        </p>
      </div>
      <div className="w-full space-y-4 lg:w-2/3">
        <Form>
          <Field>
            <Label>Expiration</Label>
            <Input data-invalid={expired} disabled defaultValue={expiresAt} />
          </Field>
        </Form>
        <RequestSignature user={user} isMe={isMe} aup={aup} />
      </div>
    </div>
  );
}
