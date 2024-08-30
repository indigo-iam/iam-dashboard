import Description from "@/components/Description";
import Field from "@/components/Field";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { capitalize } from "@/utils/strings";
import { useState } from "react";
import ClientSecretBasic from "./ClientSecretBasic";
import ClientSecretPost from "./ClientSecretPost";
import ClientSecretJwt from "./ClientSecretJwt";
import PrivateKeyJwt from "./PrivateKeyJwt";
import { useFormStatus } from "@/utils/forms";

type ClientAuthenticationSettingsProps = {
  formComponentId: string;
  authMethod: string;
};

function ClientAuthenticationSettings(
  props: Readonly<ClientAuthenticationSettingsProps>
) {
  const { formComponentId, authMethod } = props;
  switch (authMethod) {
    case "client_secret_basic":
      return <ClientSecretBasic formComponentId={formComponentId} />;
    case "client_secret_post":
      return <ClientSecretPost formComponentId={formComponentId} />;
    case "client_secret_jwt":
      return <ClientSecretJwt formComponentId={formComponentId} />;
    case "private_key_jwt":
      return <PrivateKeyJwt formComponentId={formComponentId} />;
    case "none":
      return null;
    default:
      return <p>There is nothing here</p>;
  }
}

type ClientAuthenticationProps = {
  formComponentId: string;
  tokenEndpointAuthMethods: string[];
};

export default function ClientAuthentication(
  props: Readonly<ClientAuthenticationProps>
) {
  const { formComponentId, tokenEndpointAuthMethods } = props;
  const { updateFormStatus } = useFormStatus();

  const authMethods = tokenEndpointAuthMethods.map(m => {
    return { id: m, name: capitalize(m.replaceAll("_", " ")) };
  });

  const [authMethod, setAuthMethod] = useState(authMethods[0]);

  const handleAuthMethodChange = (authMethod: { id: string; name: string }) => {
    updateFormStatus(formComponentId, false);
    setAuthMethod(authMethod);
  };

  return (
    <>
      <Field className="flex flex-col">
        <Label>Client Authentication</Label>
        <Description>A little description.</Description>
        <Select
          name="token_endpoint_auth_method"
          options={authMethods}
          onChange={handleAuthMethodChange}
        />
      </Field>
      <ClientAuthenticationSettings
        formComponentId={formComponentId}
        authMethod={authMethod.id}
      />
    </>
  );
}
