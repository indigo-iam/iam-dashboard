// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { InputSecret } from "@/app/components/input-secret";
import { Button } from "@/components/buttons";
import { CarouselPanel } from "@/components/carousel";
import { Field, Label } from "@/components/form";
import { Client } from "@/models/client";
import { redirect } from "next/navigation";

export default function ClientDetails(props: {
  newClient?: Client;
  isAdmin: boolean;
}) {
  const { newClient, isAdmin } = props;

  function changePage() {
    isAdmin ? redirect("/clients") : redirect("/clients?me");
  }

  function ClientSecret({ clientDetails }: { clientDetails: Client | undefined }) {
    const hasSecret = clientDetails?.client_secret !== undefined;
    if (clientDetails !== undefined && clientDetails?.client_secret !== undefined) {
      return (
        <Field className="flex flex-col gap-1" >
          <Label>Client Secret:</Label>
          <InputSecret secretValue={clientDetails!.client_secret}></InputSecret>
        </Field>
      );
    } else {
      return;
    }
  }

  return (
    <CarouselPanel className="panel flex w-2xl flex-col gap-2" unmount={false}>
      <h2>Client Details</h2>

      <Field className="flex flex-col gap-1">
        <Label>Client Name:</Label>
        <h3 className="rounded p-2 break-all">
          {newClient?.client_name ?? ""}
        </h3>
      </Field>

      <Field className="flex flex-col gap-1">
        <Label>Client ID:</Label>
        <h3 className="rounded p-2 break-all">{newClient?.client_id ?? ""}</h3>
      </Field>

      <Field className="flex flex-col gap-1">
        <ClientSecret clientDetails={newClient} />
      </Field>

      <div className="mt-4 mr-16 flex w-full flex-row items-end justify-end">
        <div className="ml-0 flex flex-col text-sm font-light">
          <h4 className="text-danger dark:text-danger-light font-semibold">
            WARNING
          </h4>
          <p className="dark:text-light-gray/80 text-sm dark:bg-gray-800">
            The client secret is shown only once in this screen. Make sure to
            securely save the client secret. You won't be able to access it
            again.
          </p>
        </div>
        <div>
          <Button className="btn-secondary" onClick={changePage}>
            Continue
          </Button>
        </div>
      </div>
    </CarouselPanel>
  );
}
