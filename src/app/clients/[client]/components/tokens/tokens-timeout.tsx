// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Field, Label, LabeledCheckbox } from "@/components/form";
import { Info } from "@/components/info";
import { Input } from "@/components/inputs";

type TokensTimeoutProps = {
  accessTokenValiditySeconds?: number;
  idTokenValiditySeconds?: number;
  requireAuthTime: boolean;
};

export function TokensTimeout(props: Readonly<TokensTimeoutProps>) {
  const {
    accessTokenValiditySeconds,
    idTokenValiditySeconds,
    requireAuthTime,
  } = props;
  return (
    <div className="flex flex-col gap-4 pb-4 lg:flex-row lg:gap-8">
      <div className="w-full space-y-4 text-sm lg:w-1/3">
        <div className="lg:space-y-2">
          <h5 className="font-semibold text-gray-600 dark:text-gray-100">
            Access and ID Tokens
          </h5>
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
            defaultValue={accessTokenValiditySeconds}
          />
        </Field>
        <Field>
          <Label>ID Token timeout (seconds)</Label>
          <Input
            name="id_token_validity_seconds"
            id="id-token-validity-input"
            type="number"
            defaultValue={idTokenValiditySeconds}
          />
        </Field>
        <Field className="flex items-center gap-2">
          <LabeledCheckbox
            name="require_auth_time"
            key={`require_auth_time${requireAuthTime}`}
            defaultChecked={requireAuthTime}
          >
            Always require authentication time in ID tokens
          </LabeledCheckbox>
          <Info anchor="left">
            Add the <span className="text-mono font-medium">auth_time</span>{" "}
            claim to the ID token.
          </Info>
        </Field>
      </div>
    </div>
  );
}
