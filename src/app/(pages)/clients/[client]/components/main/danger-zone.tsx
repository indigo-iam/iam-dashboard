// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { Client } from "@/models/client";

export function DangerZone(props: Readonly<{ client: Client }>) {
  const { client } = props;
  return (
    <div className="grid grid-cols-3 gap-4 pt-4">
      <div className="col-span-full flex flex-col space-y-2 text-sm font-light sm:col-span-1">
        <span className="text-danger">Danger Zone</span>
        <span className="text-extralight">
          A disabled client cannot issue new Access Tokens and Refresh Tokens
          and the old ones are immediately revoked.
        </span>
      </div>
      <Form className="col-span-full flex items-center justify-end sm:col-span-2">
        <div className="flex flex-row gap-4">
          {client.active ? (
            <Button className="btn-danger-tertiary">Disable</Button>
          ) : (
            <Button className="btn-tertiary">Enable</Button>
          )}
          <Button className="btn-danger">Delete</Button>
        </div>
      </Form>
    </div>
  );
}
