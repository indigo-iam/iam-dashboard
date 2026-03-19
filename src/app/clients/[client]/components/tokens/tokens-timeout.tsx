// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Description, Field, Label, LabeledCheckbox } from "@/components/form";
import { Input } from "@/components/inputs";
import { Client } from "@/models/client";

type TokensTimeoutProps = {
  client: Client;
};

export function TokensTimeout(props: Readonly<TokensTimeoutProps>) {
  const { client } = props;
  const {
    access_token_validity_seconds,
    id_token_validity_seconds,
    require_auth_time,
  } = client;
  return (
    <div className="flex flex-col gap-4 pb-4 lg:flex-row lg:gap-8">
      <div className="w-full space-y-4 text-sm lg:w-1/3">
        <div className="lg:space-y-2">
          <p className="font-semibold">Access and ID Tokens</p>
          <p className="font-light">
            Total duration of Access Tokens and ID Tokens.
          </p>
        </div>
      </div>
      <div className="space-y-4 lg:w-2/3">
        <Field>
          <Label>Access Token timeout (seconds)</Label>
          <Input
            name="access_token_validity_seconds"
            id="access-token-validity-input"
            type="number"
            defaultValue={access_token_validity_seconds}
          />
        </Field>
        <Field>
          <Label>ID Token timeout (seconds)</Label>
          <Input
            name="id_token_validity_seconds"
            id="id-token-validity-input"
            type="number"
            defaultValue={id_token_validity_seconds}
          />
        </Field>
        <Field>
          <LabeledCheckbox
            name="require_auth_time"
            key={`require_auth_time${require_auth_time}`}
            defaultChecked={require_auth_time}
          >
            Always require authentication time in ID tokens
          </LabeledCheckbox>
          <Description>
            Add the <span className="text-mono font-medium">auth_time</span>{" "}
            claim to the ID token.
          </Description>
        </Field>
      </div>
    </div>
  );
}
