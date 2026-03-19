// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { TabPanel } from "@/components/tabs";
import { Client } from "@/models/client";
import { editClient } from "@/services/clients";

import { TokensTimeout } from "./tokens-timeout";
import { RefreshTokenTimeout } from "./refresh-token-timeout";
import { DeviceCodeTimeout } from "./device-code-timeout";
import { updateClient } from "./actions";

type TokensProps = {
  client: Client;
};

export default function Tokens(props: Readonly<TokensProps>) {
  const { client } = props;
  const action = async (formData: FormData) => {
    "use server";
    await updateClient(client, formData);
  };
  return (
    <TabPanel className="panel" unmount={false}>
      <Form action={action}>
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
