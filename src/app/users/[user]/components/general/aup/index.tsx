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
    <div className="flex flex-col gap-4 pt-4 lg:flex-row">
      <div className="grow text-sm font-light">
        <div className="text-light dark:text-extralight/60 py-1">
          Acceptable Usage Policy
        </div>
        <div className="text-extralight">
          I don’t know why this is import but it is a very important
          information. Add something not stupid.
        </div>
      </div>
      <div className="min-w-2/3 grow space-y-2">
        <Form className="flex flex-col">
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
