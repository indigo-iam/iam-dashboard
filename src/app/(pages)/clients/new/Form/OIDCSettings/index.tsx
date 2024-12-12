import { CarouselPanel } from "@/components/Carousel";
import { Field, Label, Description, DropdownList } from "@/components/Form";
import { Section } from "@/components/Layout";
import { type Scope } from "@/models/client";
import { OpenIdConfiguration } from "@/models/openid-configuration";
import AuthenticationFlow from "./AuthenticationFlow";
import { useFormStatus } from "@/utils/forms";
import { useEffect, useState } from "react";
import ClientAuthentication from "./ClientAuthentication";

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
    <CarouselPanel unmount={false}>
      <Section title="OpenID Connect - OAuth2">
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
      </Section>
    </CarouselPanel>
  );
}
