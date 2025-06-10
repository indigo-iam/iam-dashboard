// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import {
  Checkbox,
  Description,
  Field,
  Form,
  Label,
  Select,
  SelectOption,
} from "@/components/form";
import { TabPanel } from "@/components/tabs";
import { Client } from "@/models/client";
import { GrantType } from "@/models/openid-configuration";
import { editClient } from "@/services/clients";

const grantTypes = [
  { id: "none", name: "None" },
  { id: "authorization_code", name: "Authorization Code" },
  { id: "client_credentials", name: "Client Credentials" },
];

function defaultGrantType(client: Client) {
  if (client.grant_types.includes("authorization_code")) {
    return grantTypes[1];
  } else if (client.grant_types.includes("client_credentials")) {
    return grantTypes[2];
  } else {
    return grantTypes[0];
  }
}

export default async function GrantTypes(props: Readonly<{ client: Client }>) {
  const { client } = props;
  const { grant_types } = client;

  async function action(formData: FormData) {
    "use server";
    const grant_types = (formData.getAll("grant_type") as GrantType[]).concat(
      formData.getAll("grant_type[id]") as GrantType[]
    );
    const requestBody: Client = { ...client, grant_types };
    await editClient(requestBody);
  }

  const deviceCode = grant_types.includes(
    "urn:ietf:params:oauth:grant-type:device_code"
  );
  const tokenExchange = grant_types.includes(
    "urn:ietf:params:oauth:grant-type:token-exchange"
  );
  const refreshToken = grant_types.includes("refresh_token");

  return (
    <TabPanel className="panel grid grid-cols-3 gap-4" unmount={false}>
      <div className="text-extralight col-span-full flex flex-col gap-2 text-sm sm:col-span-1">
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
      <Form
        className="col-span-full flex flex-col gap-4 sm:col-span-2"
        action={action}
      >
        <Field>
          <Label>Authorization Grant</Label>
          <Description>
            An authorization grant in OAuth 2.0 refers to the method an
            application uses to obtain an access token.
          </Description>
          <div className="max-w-52">
            <Select name="grant_type" defaultValue={defaultGrantType(client)}>
              {grantTypes.map(gt => (
                <SelectOption key={gt.id} value={gt}>
                  {gt.name}
                </SelectOption>
              ))}
            </Select>
          </div>
        </Field>
        <Field className="flex flex-col">
          <Label>Other grant types</Label>
          <Description>
            Authorize the users to obtain an access token with supplementary
            grants.
          </Description>
          <div className="inline-flex items-center gap-2">
            <Checkbox
              name="grant_type"
              value="urn:ietf:params:oauth:grant-type:device_code"
              key={`device_code${deviceCode}`}
              defaultChecked={grant_types.includes(
                "urn:ietf:params:oauth:grant-type:device_code"
              )}
            />
            <Label>Device Code</Label>
          </div>
          <div className="inline-flex items-center gap-2">
            <Checkbox
              name="grant_type"
              value="urn:ietf:params:oauth:grant-type:token-exchange"
              key={`token-exchange${tokenExchange}`}
              defaultChecked={grant_types.includes(
                "urn:ietf:params:oauth:grant-type:token-exchange"
              )}
            />
            <Label>Token Exchange</Label>
          </div>
          <div className="inline-flex items-center gap-2">
            <Checkbox
              name="grant_type"
              value="refresh_token"
              key={`refresh_token${refreshToken}`}
              defaultChecked={grant_types.includes("refresh_token")}
            />
            <Label>Refresh Token</Label>
          </div>
        </Field>
        <div className="flex flex-row justify-end">
          <Button className="btn-tertiary" type="reset">
            Cancel
          </Button>
          <Button className="btn-secondary" type="submit">
            Save changes
          </Button>
        </div>
      </Form>
    </TabPanel>
  );
}
