// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  ClientAuthentication,
  TOKEN_ENDPOINT_AUTH_VALUES,
} from "@/app/clients/components";
import { Button } from "@/components/buttons";
import { Field, Label } from "@/components/form";
import { Info } from "@/components/info";
import { TokenEndpointAuthMethod } from "@/models/client";

type AuthenticationProps = {
  clientId: string;
  tokenEndpointAuthMethod: TokenEndpointAuthMethod;
};

export function Authentication(props: Readonly<AuthenticationProps>) {
  const { clientId, tokenEndpointAuthMethod } = props;

  const defaultValue =
    TOKEN_ENDPOINT_AUTH_VALUES.find(el => el.id === tokenEndpointAuthMethod) ??
    TOKEN_ENDPOINT_AUTH_VALUES[0];

  return (
    <div className="flex flex-col gap-8 pb-4 lg:flex-row">
      <div className="flex w-full flex-col space-y-2 lg:w-1/3">
        <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-100">
          Authentication
        </h5>
        <p className="text-sm font-light">
          If the client type is confidential, the client and authorization
          server establish a client authentication method suitable for the
          security requirements of the authorization server.
        </p>
      </div>
      <div className="w-full space-y-4 pb-4 lg:w-2/3">
        <Field>
          <div className="flex items-center gap-2">
            <Label>Client Authentication</Label>
            <Info anchor="left" className="pb-1.5">
              How the client authenticate to the Token Endpoint.
            </Info>
          </div>
          <ClientAuthentication
            name="token_endpoint_auth_method"
            defaultValue={defaultValue}
            clientId={clientId}
          />
        </Field>
        <Field>
          <div className="flex items-center gap-2">
            <Label>Registration Access Token</Label>
            <Info anchor="left" className="pb-1.5">
              Registration access token provides management access to the
              client.
            </Info>
          </div>
          <Button className="btn-secondary">
            Rotate Registration Access Token
          </Button>
        </Field>
      </div>
    </div>
  );
}
