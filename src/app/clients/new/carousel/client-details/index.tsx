// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { InputSecret } from "@/app/components/input-secret";
import { Button } from "@/components/buttons";
import { CarouselPanel } from "@/components/carousel";
import { Field, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Client } from "@/models/client";
import { redirect } from "next/navigation";

type ClientSecretProps = {
  secret?: string;
};

function ClientSecret(props: Readonly<ClientSecretProps>) {
  const { secret } = props;
  return (
    <Field className="flex flex-col gap-1">
      <Label>Client Secret:</Label>
      <InputSecret value={secret} />
      <small>
        Make sure you save it - you won&apos;t be able to access it again.
      </small>
    </Field>
  );
}

type ClientDetailsProps = {
  client?: Client;
  isAdmin: boolean;
};

export default function ClientDetails(props: Readonly<ClientDetailsProps>) {
  const { client, isAdmin } = props;

  function changePage() {
    isAdmin ? redirect("/clients") : redirect("/clients?me");
  }

  return (
    <CarouselPanel className="panel flex w-2xl flex-col gap-2" unmount={false}>
      <h2>Client Details</h2>

      <Field className="flex flex-col gap-1">
        <Label>Client Name</Label>
        <Input defaultValue={client?.client_name} disabled />
      </Field>

      <Field className="flex flex-col gap-1">
        <Label>Client ID</Label>
        <Input defaultValue={client?.client_id} disabled />
      </Field>

      {client?.client_secret && (
        <Field className="flex flex-col gap-1">
          <ClientSecret secret={client?.client_secret} />
        </Field>
      )}

      <div className="mt-4 mr-16 flex w-full flex-row items-end justify-end">
        <Button className="btn-secondary" onClick={changePage}>
          Continue
        </Button>
      </div>
    </CarouselPanel>
  );
}
