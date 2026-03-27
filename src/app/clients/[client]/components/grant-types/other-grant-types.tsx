// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Description, Field, Label, LabeledCheckbox } from "@/components/form";
import { Client } from "@/models/client";

type OtherGrantTypesProps = {
  client: Client;
};

const deviceCodeKey = "urn:ietf:params:oauth:grant-type:device_code";
const tokenExchangeKey = "urn:ietf:params:oauth:grant-type:token-exchange";
const refreshTokenKey = "refresh_token";

export function OtherGrantTypes(props: Readonly<OtherGrantTypesProps>) {
  const { client } = props;
  const { grant_types } = client;
  const deviceCode = grant_types.includes(deviceCodeKey);
  const tokenExchange = grant_types.includes(tokenExchangeKey);
  const refreshToken = grant_types.includes(refreshTokenKey);
  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="w-full space-y-4 text-sm font-light lg:w-1/3">
        <div className="space-y-2">
          <p className="font-semibold text-gray-600 dark:text-gray-100">
            Other grant types
          </p>
          <p className="font-light">
            Enable other grant types for this client in addition to the default
            grant type.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 lg:w-2/3">
        <Field>
          <Label>Other grant types</Label>
        </Field>
        <Field>
          <LabeledCheckbox
            name="grant_type"
            value={deviceCodeKey}
            key={`device_code${deviceCode}`}
            defaultChecked={deviceCode}
          >
            Device code
          </LabeledCheckbox>
          <Description>
            Allow the client to obtain a token with OAuth2 device code flow
          </Description>
        </Field>
        <Field>
          <LabeledCheckbox
            name="grant_type"
            value={tokenExchangeKey}
            key={`token-exchange${tokenExchange}`}
            defaultChecked={tokenExchange}
          >
            Token Exchange
          </LabeledCheckbox>
          <Description>
            Allow the client to obtain its own tokens given a separate set of
            tokens.
          </Description>
        </Field>
        <Field>
          <LabeledCheckbox
            name="grant_type"
            value={refreshTokenKey}
            key={`refresh_token${refreshToken}`}
            defaultChecked={refreshToken}
          >
            Refresh Token
          </LabeledCheckbox>
          <Description>
            Attach the refresh token to the client in addition to Access/ID
            tokens. This option is automatically enabled when
            &quot;offline_access&quot; scope is active.
          </Description>
        </Field>
      </div>
    </div>
  );
}
