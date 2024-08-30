import Label from "@/components/Label";
import Select from "@/components/Select";
import { Description } from "@headlessui/react";
import Field from "@/components/Field";
import AuthorizationCode from "./AuthorizationCode";
import ClientCredentials from "./ClientCredentials";
import DeviceCode from "./DeviceCode";
import { useState } from "react";
import { useFormStatus } from "@/utils/forms";

type AuthenticationFlowSettingsProps = {
  formComponentId: string;
  grantType: string;
};

const AuthenticationFlowSettings = (
  props: Readonly<AuthenticationFlowSettingsProps>
) => {
  const { formComponentId, grantType } = props;
  switch (grantType) {
    case "authorization_code":
      return <AuthorizationCode formComponentId={formComponentId} />;
    case "client_credentials":
      return <ClientCredentials formComponentId={formComponentId} />;
    case "urn:ietf:params:oauth:grant-type:device_code":
      return <DeviceCode formComponentId={formComponentId} />;
    default:
      return <p>There is nothing here</p>;
  }
};

type AuthenticationFlowProps = {
  formComponentId: string;
};

export default function AuthenticationFlow(
  props: Readonly<AuthenticationFlowProps>
) {
  const { formComponentId } = props;
  const { updateFormStatus } = useFormStatus();
  const grantTypes = [
    { id: "authorization_code", name: "Authorization Code" },
    { id: "client_credentials", name: "Client Credentials" },
    { id: "urn:ietf:params:oauth:grant-type:device_code", name: "Device Code" },
  ];

  const [grantType, setGrantType] = useState(grantTypes[0]);

  const handleGrantTypeChange = (grantType: { id: string; name: string }) => {
    updateFormStatus(formComponentId, false);
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
        formComponentId={formComponentId}
        grantType={grantType.id}
      />
    </>
  );
}
