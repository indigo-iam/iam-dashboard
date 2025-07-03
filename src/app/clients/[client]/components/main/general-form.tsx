// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { Client } from "@/models/client";
import { Status } from "@/components/badges";
import { Button } from "@/components/buttons";
import { Description, Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Textarea } from "@/components/textarea";
import { dateToHuman } from "@/utils/dates";
import { editClient } from "@/services/clients";

export function GeneralForm(props: Readonly<{ client: Client }>) {
  const { client } = props;
  const createdAt = client.created_at
    ? dateToHuman(new Date(client.created_at))
    : "N/A";
  const statusChangedOn = client.status_changed_on
    ? dateToHuman(new Date(client.status_changed_on))
    : "N/A";

  async function action(formData: FormData) {
    "use server";
    const requestBody: Client = {
      ...client,
      client_name: formData.get("client_name") as string,
      client_description: formData.get("client_description") as string,
      client_uri: formData.get("client_uri") as string,
      tos_uri: formData.get("tos_uri") as string,
      policy_uri: formData.get("policy_uri") as string,
    };
    await editClient(requestBody);
  }

  return (
    <div className="flex flex-col gap-4 pb-4 lg:flex-row">
      <div className="w-full space-y-2 text-sm font-light lg:w-1/3">
        <div className="text-light dark:text-light-gray flex gap-2">
          <ComputerDesktopIcon className="my-auto size-5" />
          <span className="font-semibold">Status</span>
          <Status active={client.active ?? false} />
        </div>
        <div className="text-extralight dark:text-light-gray/80 flex flex-col">
          <span>Created {createdAt}.</span>
          <span>Status changed on {statusChangedOn}.</span>
          {client.dynamically_registered && (
            <span>Dynamically registered.</span>
          )}
        </div>
      </div>
      <Form className="w-full space-y-4 lg:w-2/3" action={action}>
        <Field>
          <Label data-required>Client Name</Label>
          <Description>Something users will recognize and trust.</Description>
          <Input
            required
            type="text"
            name="client_name"
            minLength={2}
            defaultValue={client.client_name}
          />
        </Field>
        <Field>
          <Label data-required>Client ID</Label>
          <Description>The UUID of this client.</Description>
          <Input
            required
            type="text"
            name="client_id"
            minLength={2}
            disabled={true}
            defaultValue={client.client_id}
          />
        </Field>
        <Field>
          <Label>Description</Label>
          <Description>
            This is displayed to all users of your application.
          </Description>
          <Textarea
            name="client_description"
            className="iam-input"
            placeholder="Client description..."
            defaultValue={client.client_description}
          />
        </Field>
        <Field>
          <Label>Homepage URL</Label>
          <Description>
            {
              "URL for the client's home page, which will be displayed to the user in the consent page."
            }
          </Description>
          <Input
            name="client_uri"
            placeholder="https://app.example.org"
            defaultValue={client.client_uri}
          />
        </Field>
        <Field>
          <Label>Terms of service</Label>
          <Description>
            URL of the Terms of Service for this client, will be displayed to
            the user in the consent page.
          </Description>
          <Input
            name="tos_uri"
            placeholder={"https://app.example.org/tos.html"}
            defaultValue={client.tos_uri}
          />
        </Field>
        <Field>
          <Label>Policy statement</Label>
          <Description>
            URL of the Policy statement for this client, will be displayed to
            the user in the consent page.
          </Description>
          <Input
            name="policy_uri"
            placeholder="https://app.example.org/policy.html"
            defaultValue={client.policy_uri}
          />
        </Field>
        <div className="flex justify-end">
          <Button className="btn-tertiary" type="reset">
            Cancel
          </Button>
          <Button className="btn-secondary" type="submit">
            Save changes
          </Button>
        </div>
      </Form>
    </div>
  );
}
