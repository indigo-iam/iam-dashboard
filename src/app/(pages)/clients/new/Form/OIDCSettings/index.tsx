import { CarouselPanel } from "@/components/Carousel";
import Field from "@/components/Field";
import { InputListDropdown } from "@/components/Inputs";
import Label from "@/components/Label";
import Section from "@/components/Section";
import { type Scope } from "@/models/client";
import Select from "@/components/Select";
import Description from "@/components/Description";
import { OpenIdConfiguration } from "@/models/openid-configuration";
import { camelCaseToTitle } from "@/utils/strings";
import AuthenticationFlow from "./AuthenticationFlow";
import { useFormStatus } from "@/utils/forms";
import { useEffect, useRef } from "react";
import ClientAuthentication from "./ClientAuthentication";

type OIDCSettingsProps = {
  id: string;
  systemScopes: Scope[];
  openIdConfiguration: OpenIdConfiguration;
};

export default function OIDCSettings(props: Readonly<OIDCSettingsProps>) {
  const { id, systemScopes, openIdConfiguration } = props;
  const { formStatus, updateFormStatus } = useFormStatus();
  const clientAuthStatusRef = useRef(false);
  const authFlowRef = useRef(false);
  const clientAuthComponentId = "clientAuthentication";
  const authFlowComponentId = "authenticationFlow";

  const defaultScopes = systemScopes
    .filter(scope => scope.defaultScope)
    .map(scope => {
      return { id: scope.id.toString(), name: scope.value };
    });

  const scopes = systemScopes.map(scope => {
    return { id: scope.id.toString(), name: scope.value };
  });

  const { token_endpoint_auth_methods_supported } = openIdConfiguration;

  useEffect(() => {
    const newClientAuthStatus = formStatus[clientAuthComponentId];
    const newAuthFlowStatus = formStatus[authFlowComponentId];
    if (
      clientAuthStatusRef.current !== newClientAuthStatus ||
      authFlowRef.current !== newAuthFlowStatus
    ) {
      const newStatus = newClientAuthStatus && newAuthFlowStatus;
      updateFormStatus(id, newStatus);
      clientAuthStatusRef.current = newClientAuthStatus;
      authFlowRef.current = newAuthFlowStatus;
    }
  }, [id, formStatus, updateFormStatus]);

  return (
    <CarouselPanel unmount={false}>
      <Section title="OpenID Connect - OAuth2">
        <ClientAuthentication
          formComponentId={clientAuthComponentId}
          tokenEndpointAuthMethods={token_endpoint_auth_methods_supported}
        />
        <AuthenticationFlow formComponentId={authFlowComponentId} />
        <Field>
          <Label>Scopes</Label>
          <Description>A little description.</Description>
          <InputListDropdown
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
