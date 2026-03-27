// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { LabeledCheckbox, Description, Field, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Client } from "@/models/client";

type RefreshTokenTimeoutProps = {
  client: Client;
};

export function RefreshTokenTimeout(props: Readonly<RefreshTokenTimeoutProps>) {
  const { client } = props;
  const {
    refresh_token_validity_seconds,
    reuse_refresh_token,
    clear_access_tokens_on_refresh,
  } = client;
  return (
    <div className="flex flex-col gap-4 pb-4 lg:flex-row lg:gap-8">
      <div className="w-full space-y-4 text-sm font-light lg:w-1/3">
        <div className="lg:space-y-2">
          <h5 className="font-semibold text-gray-600 dark:text-gray-100">
            Refresh Tokens
          </h5>
          <p className="font-light">
            Total duration of the Refresh Token after which a full login
            sequence is required to obtain new tokens.
          </p>
        </div>
      </div>
      <div className="space-y-4 lg:w-2/3">
        <Field>
          <Label>Refresh Token timeout (seconds)</Label>
          <Input
            id="refresh-token-validity-input"
            name="refresh_token_validity_seconds"
            defaultValue={refresh_token_validity_seconds}
          />
          <Description>
            Expiration date of newly issued Refresh Token will not exceed the
            expiration of the first issued Refresh Token, e.g.: if the Refresh
            Token timeout is 1 hour and a second flow is performed after 5
            minutes, the new Refresh Token will have a 55 minutes duration.
          </Description>
        </Field>
        <div>
          <Field>
            <LabeledCheckbox
              name="reuse_refresh_token"
              key={`reuse_refresh_token${reuse_refresh_token}`}
              defaultChecked={reuse_refresh_token}
            >
              Reuse Refresh Token
            </LabeledCheckbox>
            <Description>
              Don&apos;t invalidate the Refresh Token after usage.
            </Description>
          </Field>
        </div>
      </div>
    </div>
  );
}
