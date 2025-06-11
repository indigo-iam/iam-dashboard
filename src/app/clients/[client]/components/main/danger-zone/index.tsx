// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Form } from "@/components/form";
import { Client } from "@/models/client";
import { DeleteButton } from "./delete-button";
import { ToggleStatusButton } from "./toggle-status-button";

export function DangerZone(props: Readonly<{ client: Client }>) {
  const { client } = props;
  return (
    <div className="flex flex-col gap-4 pt-4 lg:flex-row">
      <div className="flex grow flex-col space-y-2 text-sm font-light">
        <span className="text-danger">Danger Zone</span>
        <span className="text-extralight">
          A disabled client cannot issue new Access Tokens and Refresh Tokens
          and the old ones are immediately revoked.
        </span>
      </div>
      <Form className="flex min-w-2/3 items-center justify-end">
        <div className="flex flex-row gap-4">
          <ToggleStatusButton client={client} />
          <DeleteButton client={client} />
        </div>
      </Form>
    </div>
  );
}
