// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { ClientAuthentication } from "@/app/(pages)/clients/components";
import { Button } from "@/components/buttons";
import { CarouselPanel } from "@/components/carousel";
import { Field, Label, Description, DropdownList } from "@/components/form";
import { type Scope } from "@/models/client";
import AuthenticationFlow from "./authentication-flow";
import { useState } from "react";

type OIDCSettingsProps = {
  systemScopes: Scope[];
  goBack: () => void;
  goNext: () => void;
};

export default function OIDCSettings(props: Readonly<OIDCSettingsProps>) {
  const { systemScopes, goBack, goNext } = props;
  const [authFlowOk, setAuthFlowOk] = useState(false);
  const [clientAuthOk, setClientAuthOk] = useState(false);

  const defaultScopes = systemScopes
    .filter(scope => scope.defaultScope)
    .map(scope => {
      return { id: scope.id.toString(), name: scope.value };
    });

  const scopes = systemScopes.map(scope => {
    return { id: scope.id.toString(), name: scope.value };
  });

  const canContinue = authFlowOk && clientAuthOk;

  return (
    <CarouselPanel unmount={false} className="flex flex-col gap-4">
      <AuthenticationFlow onStatusChange={setAuthFlowOk} />
      <Field>
        <Label>Client Authentication</Label>
        <Description>
          How the client authenticate to the Token Endpoint.
        </Description>
        <ClientAuthentication
          name="token_endpoint_auth_method"
          onStatusChange={setClientAuthOk}
        />
      </Field>
      <Field>
        <Label>Scopes</Label>
        <Description>A little description.</Description>
        <DropdownList
          name="scope"
          title="Add Scope"
          options={scopes}
          defaultOptions={defaultScopes}
        />
      </Field>
      <div className="flex flex-row justify-end py-2">
        <Button className="btn-tertiary" onClick={goBack}>
          Back
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
