// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { TabPanel } from "@/components/tabs";
import { toast } from "@/components/toaster";
import {
  Client,
  CodeChallengeMethod,
  TokenEndpointAuthMethod,
} from "@/models/client";
import { editClient } from "@/services/clients";
import { Authentication } from "./authentication";
import { Advanced } from "./advanced";

interface CredentialsProps {
  client: Client;
  isAdmin: boolean;
}

export default function Credentials(props: Readonly<CredentialsProps>) {
  const { client, isAdmin } = props;

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requestBody: Client = {
      ...client,
      token_endpoint_auth_method: formData.get(
        "token_endpoint_auth_method[id]"
      ) as TokenEndpointAuthMethod,
      code_challenge_method: formData.get(
        "code_challenge_method[id]"
      ) as CodeChallengeMethod,
    };
    const res = await editClient(requestBody, isAdmin);
    toast.toast(res);
  }

  return (
    <TabPanel className="panel">
      <Form onSubmit={submit} className="space-y-4">
        <div className="divide-y">
          <Authentication client={client} />
          <Advanced client={client} />
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
