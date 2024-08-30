import Label from "@/components/Label";
import Select from "@/components/Select";
import { Description } from "@headlessui/react";
import Field from "@/components/Field";
import AuthorizationCode from "./AuthorizationCode";
import ClientCredentials from "./ClientCredentials";
import DeviceCode from "./DeviceCode";
import { useState } from "react";

type AuthenticationFlowSettingsProps = {
  grantType: string;
  onStatusChange: (status: boolean) => void;
};

const AuthenticationFlowSettings = (
  props: Readonly<AuthenticationFlowSettingsProps>
) => {
  const { grantType, onStatusChange } = props;
  switch (grantType) {
    case "authorization_code":
      return <AuthorizationCode onStatusChange={onStatusChange} />;
    case "client_credentials":
      return <ClientCredentials onStatusChange={onStatusChange} />;
    case "urn:ietf:params:oauth:grant-type:device_code":
      return <DeviceCode onStatusChange={onStatusChange} />;
    default:
      return <p>There is nothing here</p>;
  }
};

type AuthenticationFlowProps = {
  onStatusChange: (status: boolean) => void;
};

export default function AuthenticationFlow(
  props: Readonly<AuthenticationFlowProps>
) {
  const { onStatusChange } = props;
  const grantTypes = [
    { id: "authorization_code", name: "Authorization Code" },
    { id: "client_credentials", name: "Client Credentials" },
    { id: "urn:ietf:params:oauth:grant-type:device_code", name: "Device Code" },
  ];

  const [grantType, setGrantType] = useState(grantTypes[0]);

  const handleGrantTypeChange = (grantType: { id: string; name: string }) => {
    onStatusChange(false);
    setGrantType(grantType);
  };

  return (
    <>
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
      <AuthenticationFlowSettings
        onStatusChange={onStatusChange}
        grantType={grantType.id}
      />
    </>
  );
}
