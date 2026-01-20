// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import {
  Carousel,
  CarouselList,
  CarouselTab,
  CarouselPanels,
} from "@/components/carousel";
import GeneralSettings from "./general-settings";
import OIDCSettings from "./oidc-settings";
import OtherSettings from "./other-settings";
import ClientDetails from "./client-details";
import { useState } from "react";
import { ClientRequest, Scope } from "@/models/client";
import { OpenIdConfiguration } from "@/models/openid-configuration";
import { Stepper } from "@/components/stepper";
import { Client } from "@/models/client";
import { Form } from "@/components/form";
import { registerClient } from "@/services/clients";

const TOTAL_PAGES = 4;

type NewClientCarouselProps = {
  systemScopes: Scope[];
  openIdConfiguration: OpenIdConfiguration;
  isAdmin: boolean;
};

export function NewClientCarousel(props: Readonly<NewClientCarouselProps>) {
  const { systemScopes, isAdmin } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const [newClient, setNewClient] = useState<Client>();
  const back = () => setCurrentPage(Math.max(0, currentPage - 1));
  const next = () => setCurrentPage(Math.min(currentPage + 1, TOTAL_PAGES));

  const action = (formData: FormData) => {

    const request: ClientRequest = {
      redirect_uris: formData.getAll("redirect_uris") as string[],
      client_name: formData.get("client_name") as string,
      client_description: (formData.get("client_description") as string) ?? "",
      contacts: formData.getAll("contacts") as string[],
      token_endpoint_auth_method: formData.get(
        "token_endpoint_auth_method[id]"
      ) as string,
      scope: "",
      grant_types: [formData.get("grant_type[id]") as string],
    };

    const scopes: string[] = [];
    const it = formData.keys();
    let result = it.next();
    while (!result.done) {
      const key = result.value;
      if (key.startsWith("scope") && key.includes("[name]")) {
        scopes.push(formData.get(key) as string);
      }
      result = it.next();
    }

    request.scope = scopes.join(" ");

    const jwk_uri = formData.get("jwk_uri") as string | undefined;
    const jwk = formData.get("jwk") as string | undefined;

    if (jwk_uri) {
      request.jwk_uri = jwk_uri;
    } else if (jwk) {
      request.jwk = jwk;
    }

    const client_uri = formData.get("client_uri") as string | undefined;
    const tos_uri = formData.get("tos_uri") as string | undefined;
    const policy_uri = formData.get("policy_uri") as string | undefined;

    if (client_uri) {
      request.client_uri = client_uri;
    }

    if (tos_uri) {
      request.tos_uri = tos_uri;
    }

    if (policy_uri) {
      request.policy_uri = policy_uri;
    }

    const save = async () => {
      // "use server";
      const resp = await registerClient(request, isAdmin);
      setNewClient(resp)
    }

    save();
    next();
  };
  console.log(newClient);

  return (
    <div className="flex justify-center">
      <div className="p-8">
        <Stepper currentPage={currentPage} totalPages={TOTAL_PAGES} />
      </div>
      <Form action={action}>
        <Carousel selectedIndex={currentPage}>
          <CarouselList>
            <CarouselTab>General Settings</CarouselTab>
            <CarouselTab>OIDC/OAuth2</CarouselTab>
            <CarouselTab>Other Info</CarouselTab>
            <CarouselTab>Client Details</CarouselTab>
          </CarouselList>
          <CarouselPanels>
            <GeneralSettings goNext={next} />
            <OIDCSettings
              systemScopes={systemScopes}
              goBack={back}
              goNext={next}
            />
            <OtherSettings goBack={back} />
            <ClientDetails newClient={newClient} />
          </CarouselPanels>
        </Carousel>
      </Form>
    </div>
  );
}
