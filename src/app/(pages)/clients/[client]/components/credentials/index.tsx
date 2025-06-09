// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  ClientAuthentication,
  TOKEN_ENDPOINT_AUTH_VALUES,
} from "@/app/(pages)/clients/components";
import { Button } from "@/components/buttons";
import {
  Description,
  Field,
  Form,
  Label,
  Select,
  SelectOption,
} from "@/components/form";
import { TabPanel } from "@/components/tabs";
import { Client } from "@/models/client";

function PKCE(props: Readonly<{ client: Client }>) {
  const { client } = props;
  const { code_challenge_method } = client;
  const options = [
    { id: "none", name: "No code challenge" },
    { id: "plain", name: "Plain code challenge" },
    { id: "S256", name: "SHA-256 hash algorithm" },
  ];
  const defaultValue =
    options.find(o => o.id === code_challenge_method) ?? options[0];

  return (
    <Select name="code_challenge_method" defaultValue={defaultValue}>
      {options.map(o => (
        <SelectOption key={o.id} value={o}>
          {o.name}
        </SelectOption>
      ))}
    </Select>
  );
}

interface CredentialsProps {
  client: Client;
}

export default function Credentials(props: Readonly<CredentialsProps>) {
  const { client } = props;
  const { token_endpoint_auth_method } = client;

  const defaultValue =
    TOKEN_ENDPOINT_AUTH_VALUES.find(
      el => el.id === token_endpoint_auth_method
    ) ?? TOKEN_ENDPOINT_AUTH_VALUES[0];

  return (
    <TabPanel className="panel">
      <div className="divide-light-gray divide-y">
        <div className="grid grid-cols-3 gap-4 pb-4">
          <div className="text-extralight col-span-full flex flex-col gap-2 text-sm sm:col-span-1">
            If the client type is confidential, the client and authorization
            server establish a client authentication method suitable for the
            security requirements of the authorization server.
          </div>
          <Form className="col-span-full flex flex-col gap-4 sm:col-span-2">
            <Field>
              <Label>Client Authentication</Label>
              <Description>
                How the client authenticate to the Token Endpoint.
              </Description>
              <ClientAuthentication
                showRegenerateClientSecret={true}
                defaultValue={defaultValue}
              />
            </Field>
            <Field>
              <Label>Registration Access Token</Label>
              <Description>
                Registration access token provides management access to the
                client.
              </Description>
              <Button className="btn-secondary">
                Regenerate Registration Access Token
              </Button>
            </Field>
          </Form>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-extralight col-span-full flex flex-col gap-2 text-sm sm:col-span-1">
            PKCE is an extension to the Authorization Code flow to prevent CSRF
            and authorization code injection attacks. PKCE is recommended even
            if a client is using a client secret or other form of client
            authentication like private_key_jwt.
          </div>
          <Form className="col-span-full sm:col-span-2">
            <Field>
              <Label>Proof Key for Code Exchange (PKCE) challenge method</Label>
              <PKCE client={client} />
            </Field>
          </Form>
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <Button className="btn-tertiary" type="reset">
          Cancel
        </Button>
        <Button className="btn-secondary" type="submit">
          Save changes
        </Button>
      </div>
    </TabPanel>
  );
}
