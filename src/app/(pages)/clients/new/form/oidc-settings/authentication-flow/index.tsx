// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Description } from "@headlessui/react";
import { Field, Label, Select, SelectOption } from "@/components/form";
import AuthorizationCode from "./authorization-code";
import ClientCredentials from "./client-credentials";
import DeviceCode from "./device-code";
import { useState } from "react";
import { GrantType } from "@/models/openid-configuration";

type AuthenticationFlowSettingsProps = {
  grantType: GrantType;
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
  const options = [
    { id: "authorization_code", name: "Authorization Code" },
    { id: "client_credentials", name: "Client Credentials" },
    { id: "urn:ietf:params:oauth:grant-type:device_code", name: "Device Code" },
  ];
  const [selectedGrantType, setSelectedGrantType] = useState(options[0]);

  const handleGrantTypeChange = (grantType: { id: string; name: string }) => {
    onStatusChange(false);
    setSelectedGrantType(grantType);
  };

  return (
    <>
      <Field>
        <Label>Authentication Flow</Label>
        <Description className="description">A little description.</Description>
        <Select
          name="grant_types"
          defaultValue={options[0]}
          onChange={handleGrantTypeChange}
        >
          {options.map(option => (
            <SelectOption key={option.id} value={option}>
              {option.name}
            </SelectOption>
          ))}
        </Select>
      </Field>
      <AuthenticationFlowSettings
        onStatusChange={onStatusChange}
        grantType={selectedGrantType.id as GrantType}
      />
    </>
  );
}
