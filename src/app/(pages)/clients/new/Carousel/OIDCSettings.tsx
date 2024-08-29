import { CarouselPanel } from "@/components/Carousel";
import Field from "@/components/Field";
import { InputList, InputListDropdown } from "@/components/Inputs";
import Label from "@/components/Label";
import Section from "@/components/Section";
import { type Scope } from "@/models/client";
import Select from "@/components/Select";
import { Description } from "@headlessui/react";
import { OpenIdConfiguration } from "@/models/openid-configuration";
import { useState } from "react";
import { InputListOption } from "@/components/Listbox";
import { camelCaseToTitle } from "@/utils/strings";

type OIDCSettingsProps = {
  systemScopes: Scope[];
  openIdConfiguration: OpenIdConfiguration;
  onChange?: (fulfilled: boolean) => void;
};

export default function OIDCSettings(props: Readonly<OIDCSettingsProps>) {
  const { systemScopes, openIdConfiguration, onChange } = props;
  const defaultScopes = systemScopes
    .filter(scope => scope.defaultScope)
    .map(scope => {
      return { id: scope.id.toString(), name: scope.value };
    });

  const scopes = systemScopes.map(scope => {
    return { id: scope.id.toString(), name: scope.value };
  });

  const { token_endpoint_auth_methods_supported, grant_types_supported } =
    openIdConfiguration;

  const authMethods = token_endpoint_auth_methods_supported.map(m => {
    return { id: m, name: camelCaseToTitle(m) };
  });

  const grantTypes = grant_types_supported.map(gt => {
    return { id: gt, name: camelCaseToTitle(gt) };
  });

  const [showRedirectUris, setShowRedirectUris] = useState(
    grantTypes[0].id === "authorization_code"
  );

  const handleGrantTypeChange = (value: InputListOption) => {
    setShowRedirectUris(value.id === "authorization_code");
    onChange?.(value.id !== "authorization_code");
  };

  const handleRedirectURIChange = (redirectUris: string[]) => {
    if (showRedirectUris) {
      onChange?.(redirectUris.length > 0);
    }
  };

  return (
    <CarouselPanel unmount={false}>
      <Section title="OpenID Connect - OAuth2">
        <Field className="flex flex-col">
          <Label>Client Authentication</Label>
          <Description className="text-xs text-primary/60">
            A little description.
          </Description>
          <Select name="token_endpoint_auth_method" options={authMethods} />
        </Field>
        <Field>
          <Label>Authentication Flow</Label>
          <Description className="text-xs text-primary/60">
            A little description.
          </Description>
          <Select
            name="grant_types"
            options={grantTypes}
            onChange={handleGrantTypeChange}
          />
        </Field>
        {showRedirectUris ? (
          <Field>
            <Label required>Redirect URIs</Label>
            <Description className="text-xs text-primary/60">
              At least a valid Redirect URI is required when Authorization Code
              is selected.
            </Description>
            <InputList
              originalItems={[]}
              name="redirect_uris"
              type="url"
              placeholder="https://app.exchange.com/callback"
              onChange={handleRedirectURIChange}
              required={showRedirectUris}
            />
          </Field>
        ) : null}
        <Field>
          <Label>Scopes</Label>
          <Description className="text-xs text-primary/60">
            A little description.
          </Description>
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
