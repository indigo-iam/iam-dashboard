// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { Status } from "@/components/badges";
import { Button } from "@/components/buttons";
import { Description, Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Textarea } from "@/components/textarea";
import { Client } from "@/models/client";
import { dateToHuman } from "@/utils/dates";

export function GeneralForm(props: Readonly<{ client: Client }>) {
  const { client } = props;
  const createdAt = client.created_at
    ? dateToHuman(new Date(client.created_at))
    : "N/A";
  const statusChangedOn = client.status_changed_on
    ? dateToHuman(new Date(client.status_changed_on))
    : "N/A";
  return (
    <div className="border-extralight/60 grid grid-cols-3 gap-4 pb-4">
      <div className="col-span-full space-y-2 text-sm font-light sm:col-span-1">
        <div>
          <div className="text-light dark:text-extralight/60 flex gap-2">
            <ComputerDesktopIcon className="my-auto size-5" />
            <span>Status</span>
            <Status active={client.active ?? false} />
          </div>
        </div>
        <div className="text-extralight flex flex-col">
          <span>Created {createdAt}.</span>
          <span>Status changed on {statusChangedOn}.</span>
          {client.dynamically_registered && (
            <span>Dynamically registered.</span>
          )}
        </div>
      </div>
      <Form className="col-span-2 space-y-4">
        {/* Add hidden inputs to not overwrite the db entries with null values */}
        <input
          name="client_secret"
          defaultValue={client.client_secret}
          hidden={true}
        />
        <input
          name="allow_introspection"
          defaultValue={`${client.allow_introspection}`}
          hidden={true}
        />
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
            URL for the client' s home page, which will be displayed to the user
            in the consent page.
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
            name="policy_url"
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
