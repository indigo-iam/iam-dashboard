// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { toast } from "@/components/toaster";
import { AUP } from "@/models/aup";
import { fetchAUP } from "@/services/aup";
import { dateToHuman, getDate } from "@/utils/dates";
import { RequestSignature } from "./request-signature";
import { SignInBehalfOfUser } from "./sign-in-behalf-user";

async function getExpirationDate(
  aup: AUP,
  userAupSignatureTime: string | null
) {
  if (aup.signatureValidityInDays === 0) {
    return {
      expiresAt: "N/A",
      expired: false,
    };
  }

  const aupExpirationDate = userAupSignatureTime
    ? new Date(userAupSignatureTime)
    : new Date();
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
  isMe: boolean;
  isAdmin: boolean;
  userId: string;
  userFormattedName: string;
  userAupSignatureTime: string | null;
};

export async function Aup(props: Readonly<AupProps>) {
  const {
    isMe, //
    isAdmin,
    userId,
    userFormattedName,
    userAupSignatureTime,
  } = props;
  const aup = await fetchAUP();
  console.log(aup, userAupSignatureTime);
  if (!aup) {
    return null;
  }

  if ("title" in aup && "type" in aup) {
    toast.toast(aup);
    return null;
  }

  const { expiresAt, expired } = await getExpirationDate(
    aup,
    userAupSignatureTime
  );
  return (
    <div className="flex flex-col gap-8 py-4 last:pb-0 lg:flex-row">
      <div className="w-full space-y-2 text-sm font-light lg:w-1/3">
        <h5 className="font-semibold">Acceptable Usage Policy</h5>
        <div className="space-y-1">
          <p className="whitespace-normal">
            In order to use this service the AUP must be signed by the user.
          </p>
          <p>
            It is possible to re-sign the AUP before it expires. Once the AUP is
            expired, the user is asked to sign the new AUP at login.
          </p>
        </div>
      </div>
      <div className="w-full space-y-4 lg:w-2/3">
        <Form>
          <Field>
            <Label>Expiration</Label>
            <Input data-invalid={expired} disabled defaultValue={expiresAt} />
          </Field>
        </Form>
        <div className="flex flex-wrap gap-2">
          <RequestSignature
            userId={userId}
            userFormattedName={userFormattedName}
            isMe={isMe}
            aup={aup}
          />
          {isAdmin && !isMe && (
            <SignInBehalfOfUser
              userId={userId}
              userFormattedName={userFormattedName}
            />
          )}
        </div>
      </div>
    </div>
  );
}
