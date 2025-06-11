// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { AuthenticationFlow } from "@/app/clients/components";
import { Button } from "@/components/buttons";
import { Checkbox, Description, Field, Form, Label } from "@/components/form";
import { TabPanel } from "@/components/tabs";
import { Client } from "@/models/client";
import { GrantType } from "@/models/openid-configuration";
import { editClient } from "@/services/clients";
import { useState } from "react";

const grantTypes = [
  { id: "none", name: "None" },
  { id: "authorization_code", name: "Authorization Code" },
  { id: "client_credentials", name: "Client Credentials" },
  { id: "urn:ietf:params:oauth:grant-type:device_code", name: "Device Code" },
];

function defaultGrantType(client: Client) {
  if (client.grant_types.includes("authorization_code")) {
    return grantTypes[1];
  } else if (client.grant_types.includes("client_credentials")) {
    return grantTypes[2];
  } else if (
    client.grant_types.includes("urn:ietf:params:oauth:grant-type:device_code")
  ) {
    return grantTypes[3];
  } else {
    return grantTypes[0];
  }
}

export default function GrantTypes(props: Readonly<{ client: Client }>) {
  const { client } = props;
  const { grant_types } = client;
  const [isAuthGrantOk, setIsAuthGrantOk] = useState(false);

  async function action(formData: FormData) {
    const grant_types = (formData.getAll("grant_type") as GrantType[]).concat(
      formData.getAll("grant_type[id]") as GrantType[]
    );
    const redirect_uris = formData.getAll("redirect_uris") as string[];
    const requestBody: Client = { ...client, grant_types, redirect_uris };
    return editClient(requestBody);
  }

  const deviceCode = grant_types.includes(
    "urn:ietf:params:oauth:grant-type:device_code"
  );
  const tokenExchange = grant_types.includes(
    "urn:ietf:params:oauth:grant-type:token-exchange"
  );
  const refreshToken = grant_types.includes("refresh_token");

  return (
    <TabPanel className="panel flex flex-col gap-4 lg:flex-row" unmount={false}>
      <div className="text-extralight flex flex-col gap-2 text-sm">
        <span>
          Device code: allow the clients to obtain a token with OAuth2 device
          code flow
        </span>
        <span>
          Token Exchange: allow the client to obtain its own tokens given a
          separate set of tokens.
        </span>
        <span>
          Refresh Token: attach the refresh token to the client in addition to
          Access/ID tokens
        </span>
      </div>
      <Form className="flex min-w-2/3 flex-col gap-4" action={action}>
        <Field>
          <Label>Authorization Grant</Label>
          <Description>
            An authorization grant in OAuth 2.0 refers to the method an
            application uses to obtain an access token.
          </Description>
          <AuthenticationFlow
            client={client}
            defaultValue={defaultGrantType(client)}
            onStatusChange={setIsAuthGrantOk}
          />
        </Field>
        <div className="flex flex-col">
          <Field>
            <Label>Other grant types</Label>
            <Description>
              Authorize the users to obtain an access token with supplementary
              grants.
            </Description>
          </Field>
          <Field className="inline-flex items-center gap-2">
            <Checkbox
              name="grant_type"
              value="urn:ietf:params:oauth:grant-type:device_code"
              key={`device_code${deviceCode}`}
              defaultChecked={grant_types.includes(
                "urn:ietf:params:oauth:grant-type:device_code"
              )}
            />
            <Label>Device Code</Label>
          </Field>
          <Field className="inline-flex items-center gap-2">
            <Checkbox
              name="grant_type"
              value="urn:ietf:params:oauth:grant-type:token-exchange"
              key={`token-exchange${tokenExchange}`}
              defaultChecked={grant_types.includes(
                "urn:ietf:params:oauth:grant-type:token-exchange"
              )}
            />
            <Label>Token Exchange</Label>
          </Field>
          <Field className="inline-flex items-center gap-2">
            <Checkbox
              name="grant_type"
              value="refresh_token"
              key={`refresh_token${refreshToken}`}
              defaultChecked={grant_types.includes("refresh_token")}
            />
            <Label>Refresh Token</Label>
          </Field>
        </div>
        <div className="flex flex-row justify-end">
          <Button className="btn-tertiary" type="reset">
            Cancel
          </Button>
          <Button
            className="btn-secondary"
            type="submit"
            disabled={!isAuthGrantOk}
          >
            Save changes
          </Button>
        </div>
      </Form>
    </TabPanel>
  );
}
