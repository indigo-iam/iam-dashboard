// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { User } from "@/models/scim";
import { fetchAUP } from "@/services/aup";
import { dateToHuman } from "@/utils/dates";
import { RequestSignature } from "./request-signature";

type AupProps = {
  user: User;
  isMe: boolean;
};

export async function Aup(props: Readonly<AupProps>) {
  const { user, isMe } = props;
  const [aupExpiresIn, expired] = await (async () => {
    const aupSignatureTime =
      user["urn:indigo-dc:scim:schemas:IndigoUser"]?.aupSignatureTime;
    if (!aupSignatureTime) {
      return ["N/A", false];
    }
    const aup = await fetchAUP();
    const aupSignatureDate = new Date(aupSignatureTime);
    const aupExpirationDate = new Date(
      aupSignatureDate.getTime() + aup.signatureValidityInDays * 86400000
    );
    const expired = aupExpirationDate < new Date();
    return [dateToHuman(aupExpirationDate), expired];
  })();

  return (
    <div className="flex flex-col gap-8 py-4 last:pb-0 lg:flex-row">
      <div className="text-extralight dark:text-light-gray/80 w-full text-sm font-light lg:w-1/3">
        <h5 className="text-light dark:text-light-gray py-1 font-semibold">
          Acceptable Usage Policy
        </h5>
        <p className="whitespace-normal">
          Curabitur id libero vehicula, molestie lorem a, tempor tellus.
        </p>
      </div>
      <div className="w-full space-y-8 lg:w-2/3">
        <Form>
          <Field>
            <Label>Expiration</Label>
            <Input
              data-invalid={expired}
              disabled
              defaultValue={aupExpiresIn}
            />
          </Field>
        </Form>
        <RequestSignature user={user} isMe={isMe} />
      </div>
    </div>
  );
}
