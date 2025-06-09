// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { Checkbox, Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { TabPanel } from "@/components/tabs";
import { Client } from "@/models/client";

function AccessToken(props: Readonly<{ client: Client }>) {
  const { client } = props;
  const {
    access_token_validity_seconds,
    id_token_validity_seconds,
    require_auth_time,
  } = client;
  return (
    <div className="flex flex-col gap-2 pb-4">
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
      <Field className="flex flex-row items-center gap-2">
        <Checkbox name="require_auth_time" defaultChecked={require_auth_time} />
        <Label>Always require authentication time in ID tokens</Label>
      </Field>
    </div>
  );
}

function RefreshToken(props: Readonly<{ client: Client }>) {
  const { client } = props;
  const {
    refresh_token_validity_seconds,
    reuse_refresh_token,
    clear_access_tokens_on_refresh,
  } = client;
  return (
    <div className="flex flex-col py-4">
      <Field>
        <Label>Refresh Token timeout (seconds)</Label>
        <Input
          id="refresh-token-validity-input"
          name="refresh_token_validity_seconds"
          defaultValue={refresh_token_validity_seconds}
        />
      </Field>
      <Field className="flex flex-row items-center gap-2">
        <Checkbox
          name="reuse_refresh_token"
          defaultChecked={reuse_refresh_token}
        />
        <Label>Reuse Refresh Token</Label>
      </Field>
      <Field className="flex flex-row items-center gap-2">
        <Checkbox
          name="clear_access_tokens_on_refresh"
          defaultChecked={clear_access_tokens_on_refresh}
        />
        <Label>Clear Access Tokens on refresh</Label>
      </Field>
    </div>
  );
}

function DeviceCode(props: Readonly<{ client: Client }>) {
  const { client } = props;
  const { device_code_validity_seconds } = client;
  return (
    <div className="pt-4">
      <Field>
        <Label>Device Code timeout (seconds)</Label>
        <Input
          type="number"
          id="device-code-validity-input"
          name="device_code_validity_seconds"
          defaultValue={device_code_validity_seconds}
        />
        <p className="text-secondary-400 mt-2 text-sm">
          The control is disabled as the client is not authorized for the device
          code grant type.
        </p>
      </Field>
    </div>
  );
}

type TokensProps = {
  client: Client;
};

export default function Tokens(props: Readonly<TokensProps>) {
  const { client } = props;

  return (
    <TabPanel className="panel">
      <Form>
        <div className="divide-light-gray divide-y">
          <AccessToken client={client} />
          <RefreshToken client={client} />
          <DeviceCode client={client} />
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
