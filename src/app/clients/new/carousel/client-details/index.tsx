// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { CarouselPanel } from "@/components/carousel";
import { Field, Label } from "@/components/form";
import { InputSecret } from "@/app/components/input-secret";
import { Client } from "@/models/client";
import { redirect } from "next/navigation";

export default function ClientDetails(props: {
  newClient?: Client;
  isAdmin: boolean;
}) {
  const { newClient, isAdmin } = props;

  function changePage() {
    const event = new CustomEvent("nextPage");
    window.dispatchEvent(event);


    // Logic to change the carousel page goes here
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
        <h3 className="break-all p-2 rounded" >
          {props.newClient?.client_name || ""}
        </h3>
      </Field>

      <Field className="flex flex-col gap-1">
        <Label>Client ID:</Label>
        <h3 className="break-all p-2 rounded" >
          {props.newClient?.client_id}
        </h3>
      </Field>

      <Field className="flex flex-col gap-1" >
        {<ClientSecret clientDetails={props.newClient} />}
      </Field>

      <br />
      <div className="flex w-full flex-col text-sm font-light lg:w-4/5">
        <span className="text-danger dark:text-danger-light font-semibold">
          WARNING
        </span>
        <p className="text-sm dark:text-light-gray/80 dark:bg-gray-800 ">
          The client secret is shown only once in this screen.
          Make sure to copy it and store it in a safe place before click on continue button.
        </p>
      </div>

      <div className="flex flex-row justify-end py-2">
        <Button className="btn-secondary" onClick={changePage}>
          Continue
        </Button>
      </div>
    </CarouselPanel>
  );
}