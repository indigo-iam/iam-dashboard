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
import { useEffect } from "react";

type OIDCSettingsProps = {
  id: string;
  systemScopes: Scope[];
  openIdConfiguration: OpenIdConfiguration;
};

export default function OIDCSettings(props: Readonly<OIDCSettingsProps>) {
  const { id, systemScopes, openIdConfiguration } = props;
  const { formStatus, updateFormStatus } = useFormStatus();

  const defaultScopes = systemScopes
    .filter(scope => scope.defaultScope)
    .map(scope => {
      return { id: scope.id.toString(), name: scope.value };
    });

  const scopes = systemScopes.map(scope => {
    return { id: scope.id.toString(), name: scope.value };
  });

  const { token_endpoint_auth_methods_supported } = openIdConfiguration;

  const authMethods = token_endpoint_auth_methods_supported.map(m => {
    return { id: m, name: camelCaseToTitle(m) };
  });

  useEffect(() => {
    updateFormStatus(id, formStatus["authenticationFlow"]);
  }, [formStatus["authenticationFlow"]]);

  return (
    <CarouselPanel unmount={false}>
      <Section title="OpenID Connect - OAuth2">
        <Field className="flex flex-col">
          <Label>Client Authentication</Label>
          <Description>A little description.</Description>
          <Select name="token_endpoint_auth_method" options={authMethods} />
        </Field>
        <AuthenticationFlow formComponentId="authenticationFlow" />
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
