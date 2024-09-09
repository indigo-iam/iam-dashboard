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

type ClientAuthenticationSettingsProps = {
  authMethod: string;
  onStatusChange: (status: boolean) => void;
};

function ClientAuthenticationSettings(
  props: Readonly<ClientAuthenticationSettingsProps>
) {
  const { authMethod, onStatusChange } = props;
  switch (authMethod) {
    case "client_secret_basic":
      return <ClientSecretBasic onStatusChange={onStatusChange} />;
    case "client_secret_post":
      return <ClientSecretPost onStatusChange={onStatusChange} />;
    case "client_secret_jwt":
      return <ClientSecretJwt onStatusChange={onStatusChange} />;
    case "private_key_jwt":
      return <PrivateKeyJwt onStatusChange={onStatusChange} />;
    case "none":
      return null;
    default:
      return <p>There is nothing here</p>;
  }
}

type ClientAuthenticationProps = {
  tokenEndpointAuthMethods: string[];
  onStatusChange: (status: boolean) => void;
};

export default function ClientAuthentication(
  props: Readonly<ClientAuthenticationProps>
) {
  const { tokenEndpointAuthMethods, onStatusChange } = props;

  const authMethods = tokenEndpointAuthMethods.map(m => {
    return { id: m, name: capitalize(m.replaceAll("_", " ")) };
  });

  const [authMethod, setAuthMethod] = useState(authMethods[0]);

  const handleAuthMethodChange = (authMethod: { id: string; name: string }) => {
    onStatusChange(false);
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
        onStatusChange={onStatusChange}
        authMethod={authMethod.id}
      />
    </>
  );
}
