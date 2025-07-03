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
      <div className="flex w-full flex-col space-y-2 text-sm font-light lg:w-1/3">
        <span className="text-danger dark:text-danger-light font-semibold">
          Danger Zone
        </span>
        <p className="text-extralight dark:text-light-gray/80">
          A disabled client cannot issue new Access Tokens and Refresh Tokens
          and the old ones are immediately revoked.
        </p>
      </div>
      <Form className="flex w-full items-center justify-end lg:w-2/3">
        <div className="flex flex-row gap-4">
          <ToggleStatusButton client={client} />
          <DeleteButton client={client} />
        </div>
      </Form>
    </div>
  );
}
