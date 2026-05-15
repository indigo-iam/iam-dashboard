// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { TabPanel } from "@/components/tabs";
import { toaster } from "@/components/toaster";
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
    toaster.send(res);
  }

  return (
    <TabPanel className="panel" unmount={false}>
      <Form onSubmit={submit}>
        <div className="space-y-4 divide-y">
          <TokensTimeout client={client} />
          <RefreshTokenTimeout client={client} />
          <DeviceCodeTimeout client={client} />
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
