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
import { Description, DropdownList, Field, Label } from "@/components/form";
import { type Scope } from "@/models/client";

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

  const defaultScopes = systemScopes
    .filter(scope => scope.defaultScope)
    .map(scope => {
      const title = scope.restricted
        ? `${scope.value} (restricted)`
        : scope.value;
      return {
        title,
        value: { id: scope.id.toString(), name: scope.value },
        disabled: scope.restricted && !isAdmin,
      };
    });

  const scopes = systemScopes.map(scope => {
    const title = scope.restricted
      ? `${scope.value} (restricted)`
      : scope.value;
    return {
      title,
      value: { id: scope.id.toString(), name: scope.value },
      disabled: scope.restricted && !isAdmin,
    };
  });

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
        <DropdownList
          name="scope"
          title="Add Scope"
          options={scopes}
          defaultOptions={defaultScopes}
        />
        <Description>
          Restricted scopes can be enabled only by an administrator. If you need
          a restricted scope for your client, please contact the administrator
          of your organization.
        </Description>
      </Field>
      <div className="flex flex-row justify-end py-2">
        <Button className="btn-tertiary" onClick={goBack}>
          <div className="flex items-center">
            <ChevronLeftIcon className="-ml-2 size-5" />
            Back
          </div>
        </Button>
        <Button
          className="btn-secondary"
          onClick={goNext}
          disabled={!canContinue}
        >
          Continue
        </Button>
      </div>
    </CarouselPanel>
  );
}
