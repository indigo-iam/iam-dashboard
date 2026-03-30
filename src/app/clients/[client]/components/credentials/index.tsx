// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  ClientAuthentication,
  TOKEN_ENDPOINT_AUTH_VALUES,
} from "@/app/clients/components";
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
import {
  Client,
  CodeChallengeMethod,
  TokenEndpointAuthMethod,
} from "@/models/client";
import { editClient } from "@/services/clients";

type PkceProps = {
  name: string;
  client: Client;
};

function PKCE(props: Readonly<PkceProps>) {
  const { name, client } = props;
  const { code_challenge_method } = client;
  const options = [
    { id: "none", name: "No code challenge" },
    { id: "plain", name: "Plain code challenge" },
    { id: "S256", name: "SHA-256 hash algorithm" },
  ];
  const defaultValue =
    options.find(o => o.id === code_challenge_method) ?? options[0];

  return (
    <Select name={name} defaultValue={defaultValue}>
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
  isAdmin: boolean;
}

export default function Credentials(props: Readonly<CredentialsProps>) {
  const { client, isAdmin } = props;
  const { token_endpoint_auth_method, client_id } = client;

  const defaultValue =
    TOKEN_ENDPOINT_AUTH_VALUES.find(
      el => el.id === token_endpoint_auth_method
    ) ?? TOKEN_ENDPOINT_AUTH_VALUES[0];

  async function action(formData: FormData) {
    "use server";
    const requestBody: Client = {
      ...client,
      token_endpoint_auth_method: formData.get(
        "token_endpoint_auth_method[id]"
      ) as TokenEndpointAuthMethod,
      code_challenge_method: formData.get(
        "code_challenge_method[id]"
      ) as CodeChallengeMethod,
    };
    await editClient(requestBody, isAdmin);
  }

  return (
    <TabPanel className="panel" unmount={false}>
      <Form action={action} className="space-y-4">
        <div className="divide-y">
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
                <Label>Client Authentication</Label>
                <ClientAuthentication
                  name="token_endpoint_auth_method"
                  defaultValue={defaultValue}
                  clientId={client_id}
                />
              </Field>
              <Field>
                <Label>Registration Access Token</Label>
                <Button className="btn-secondary">
                  Rotate Registration Access Token
                </Button>
                <Description>
                  Registration access token provides management access to the
                  client.
                </Description>
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-8 pt-4 lg:flex-row">
            <div className="flex w-full flex-col space-y-2 lg:w-1/3">
              <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-100">
                Advanced
              </h5>
              <p className="text-sm font-light">
                PKCE is an extension to the Authorization Code flow to prevent
                CSRF and authorization code injection attacks. PKCE is
                recommended even if a client is using a client secret or other
                form of client authentication like private_key_jwt.
              </p>
            </div>
            <div className="flex w-full flex-col lg:w-2/3">
              <Field>
                <Label>
                  Proof Key for Code Exchange (PKCE) challenge method
                </Label>
                <PKCE name="code_challenge_method" client={client} />
              </Field>
            </div>
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
      </Form>
    </TabPanel>
  );
}
