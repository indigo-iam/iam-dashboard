// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { CarouselPanel } from "@/components/carousel";
import { Field, Label, Description, DropdownList } from "@/components/form";
import { type Scope } from "@/models/client";
import { OpenIdConfiguration } from "@/models/openid-configuration";
import { useFormStatus } from "@/utils/forms";
import AuthenticationFlow from "./authentication-flow";
import ClientAuthentication from "./client-authentication";
import { useEffect, useState } from "react";

type OIDCSettingsProps = {
  id: string;
  systemScopes: Scope[];
  openIdConfiguration: OpenIdConfiguration;
};

export default function OIDCSettings(props: Readonly<OIDCSettingsProps>) {
  const { id, systemScopes, openIdConfiguration } = props;
  const { updateFormStatus } = useFormStatus();
  const [authFlowFulfilled, setAuthFlowFulfilled] = useState(false);
  const [clientAuthFulfilled, setClientAuthFulfilled] = useState(false);
  const { token_endpoint_auth_methods_supported } = openIdConfiguration;

  const defaultScopes = systemScopes
    .filter(scope => scope.defaultScope)
    .map(scope => {
      return { id: scope.id.toString(), name: scope.value };
    });

  const scopes = systemScopes.map(scope => {
    return { id: scope.id.toString(), name: scope.value };
  });

  useEffect(() => {
    updateFormStatus(id, authFlowFulfilled && clientAuthFulfilled);
    // adding updateFormStatus causes infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, authFlowFulfilled, clientAuthFulfilled]);

  return (
    <CarouselPanel unmount={false} className="flex flex-col gap-4">
      <AuthenticationFlow onStatusChange={setAuthFlowFulfilled} />
      <ClientAuthentication
        onStatusChange={setClientAuthFulfilled}
        tokenEndpointAuthMethods={token_endpoint_auth_methods_supported}
      />
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
    </CarouselPanel>
  );
}
