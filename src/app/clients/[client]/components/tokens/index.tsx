// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { TabPanel } from "@/components/tabs";
import { toast } from "@/components/toaster";
import { Client } from "@/models/client";

import { TokensTimeout } from "./tokens-timeout";
import { RefreshTokenTimeout } from "./refresh-token-timeout";
import { DeviceCodeTimeout } from "./device-code-timeout";
import { updateClient } from "./actions";

type TokensProps = {
  client: Client;
  isAdmin: boolean;
};

export default function Tokens(props: Readonly<TokensProps>) {
  const { client, isAdmin } = props;

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await updateClient(client, formData, isAdmin);
    toast.toast(res);
  }

  return (
    <TabPanel className="panel">
      <Form onSubmit={submit}>
        <div className="space-y-4 divide-y">
          <TokensTimeout
            accessTokenValiditySeconds={client.access_token_validity_seconds}
            idTokenValiditySeconds={client.id_token_validity_seconds}
            requireAuthTime={client.require_auth_time}
          />
          <RefreshTokenTimeout
            refreshTokenValiditySeconds={client.refresh_token_validity_seconds}
            reuseRefreshToken={client.reuse_refresh_token ?? false}
          />
          <DeviceCodeTimeout
            grantTypes={client.grant_types}
            deviceCodeValiditySeconds={client.device_code_validity_seconds}
          />
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
