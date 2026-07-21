// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Field, LabeledCheckbox } from "@/components/form";
import { toast } from "@/components/toaster";
import { Client } from "@/models/client";
import { editClient } from "@/services/clients";

type AdvancedSettings = {
  client: Client;
  isAdmin: boolean;
};

export function AdvancedSettings(props: Readonly<AdvancedSettings>) {
  const { client, isAdmin } = props;
  const upScopingEnabled = client.up_scoping_enabled;

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const up_scoping_enabled = formData.get("up-scoping-enabled") === "on";
    const body: Client = { ...client, up_scoping_enabled };
    const res = await editClient(body, isAdmin);
    toast.toast(res);
  }

  return (
    <div className="space-y-4">
      <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-100">
        Advanced Settings
      </h5>
      <form onSubmit={handleSubmit}>
        <Field>
          <LabeledCheckbox
            name="up-scoping-enabled"
            defaultChecked={upScopingEnabled}
          >
            Enable up scoping for token exchange
          </LabeledCheckbox>
        </Field>
        <div className="flex justify-end">
          <Button className="btn-secondary" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
