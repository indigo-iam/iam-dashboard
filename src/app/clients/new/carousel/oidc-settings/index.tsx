// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

import {
  AuthenticationFlow,
  ClientAuthentication,
} from "@/app/clients/components";
import { Button } from "@/components/buttons";
import { CarouselPanel } from "@/components/carousel";
import { Description, Field, Label } from "@/components/form";
import { type Scope } from "@/models/client";
import { Dropdown, DropdownOption } from "@/components/dropdown";

type OIDCSettingsProps = {
  isAdmin: boolean;
  systemScopes: Scope[];
  goBack: () => void;
  goNext: () => void;
};

export default function OIDCSettings(props: Readonly<OIDCSettingsProps>) {
  const { isAdmin, systemScopes, goBack, goNext } = props;
  const [authFlowOk, setAuthFlowOk] = useState(false);
  const [clientAuthOk, setClientAuthOk] = useState(false);
  const defaultScopes = systemScopes.filter(scope => scope.defaultScope);
  const canContinue = authFlowOk && clientAuthOk;
  return (
    <CarouselPanel className="panel flex flex-col gap-2" unmount={false}>
      <h2>OpenID Connect - OAuth 2</h2>
      <AuthenticationFlow redirectUris={[]} onStatusChange={setAuthFlowOk} />
      <Field>
        <Label>Client Authentication</Label>
        <ClientAuthentication
          name="token_endpoint_auth_method"
          onStatusChange={setClientAuthOk}
        />
        <Description>
          How the client authenticate to the Token Endpoint.
        </Description>
      </Field>
      <Field>
        <Label>Scopes</Label>
        <Dropdown
          name="scope"
          placeholder="Add scopes..."
          defaultValue={defaultScopes.map(e => e.value)}
        >
          {systemScopes.map(s => (
            <DropdownOption
              key={s.id}
              value={s.value}
              disabled={s.restricted && !isAdmin}
            >
              {s.value}
            </DropdownOption>
          ))}
        </Dropdown>
        <Description>
          Restricted scopes can be enabled only by an administrator. If you need
          a restricted scope, please contact your the administrator of your
          organization.
        </Description>
      </Field>
      <div className="flex flex-row justify-end py-2">
        <Button variant="underline" type="button" onClick={goBack}>
          <ChevronLeftIcon className="mt-0.5 size-4" />
          Back
        </Button>
        <Button
          variant="outline"
          onClick={goNext}
          disabled={!canContinue}
          type="button"
        >
          Continue
        </Button>
      </div>
    </CarouselPanel>
  );
}
