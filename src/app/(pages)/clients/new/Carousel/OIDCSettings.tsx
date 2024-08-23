import { CarouselPanel } from "@/components/Carousel";
import Field from "@/components/Field";
import { InputListDropdown } from "@/components/Inputs";
import Label from "@/components/Label";
import Section from "@/components/Section";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { type Scope } from "@/models/client";
import Select from "@/components/Select";
import { Description } from "@headlessui/react";
import { OpenIdConfiguration } from "@/models/openid-configuration";

const Scope = (props: { item: string; name: string }) => {
  const { item, name } = props;
  return (
    <li key={item} className="mt-1 flex flex-row items-center gap-2 text-sm">
      <button
        type="button"
        className="w-5 rounded bg-secondary-100 hover:bg-danger hover:text-secondary"
      >
        <XMarkIcon />
      </button>
      <input
        className="w-full"
        defaultValue={item}
        name={name}
        contentEditable={false}
      />
    </li>
  );
};

type OIDCSettingsProps = {
  systemScopes: Scope[];
  openIdConfiguration: OpenIdConfiguration;
};

export default function OIDCSettings(props: Readonly<OIDCSettingsProps>) {
  const { systemScopes, openIdConfiguration } = props;
  const defaultScopes = systemScopes
    .filter(scope => scope.defaultScope)
    .map(scope => {
      return { name: scope.value, value: scope.value };
    });
  const scopes = systemScopes.map(scope => {
    return { name: scope.value, value: scope.value };
  });

  const { token_endpoint_auth_methods_supported, grant_types_supported } =
    openIdConfiguration;

  return (
    <CarouselPanel unmount={false}>
      <Section title="OpenID Connect - OAuth2">
        <Field className="flex flex-col">
          <Label>Client Authentication</Label>
          <Description className="text-xs text-primary/60">
            A little description.
          </Description>
          <Select name="token_endpoint_auth_method">
            {token_endpoint_auth_methods_supported.map(m => {
              return (
                <option key={m} value={m}>
                  {m}
                </option>
              );
            })}
          </Select>
        </Field>
        <Field>
          <Label>Authentication Flow</Label>
          <Description className="text-xs text-primary/60">
            A little description.
          </Description>
          <Select name="grant_types">
            {grant_types_supported.map(gt => {
              return (
                <option key={gt} value={gt}>
                  {gt}
                </option>
              );
            })}
          </Select>
        </Field>
        <Field>
          <Label>Scopes</Label>
          <Description className="text-xs text-primary/60">
            A little description.
          </Description>
          <InputListDropdown
            name="scopes"
            title="Add Scope"
            options={scopes}
            defaultOptions={defaultScopes}
          />
        </Field>
      </Section>
    </CarouselPanel>
  );
}
