// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import {
  Field,
  Label,
  Select,
  SelectOption,
  Description,
} from "@/components/form";
import { Client } from "@/models/client";
import { GrantType } from "@/models/openid-configuration";
import AuthorizationCode from "./authorization-code";
import ClientCredentials from "./client-credentials";
import DeviceCode from "./device-code";
import { useState } from "react";

type AuthenticationFlowSettingsProps = {
  client?: Client;
  grantType: GrantType;
  onStatusChange?: (status: boolean) => void;
};

const AuthenticationFlowSettings = (
  props: Readonly<AuthenticationFlowSettingsProps>
) => {
  const { client, grantType, onStatusChange } = props;
  switch (grantType) {
    case "authorization_code":
      return (
        <AuthorizationCode client={client} onStatusChange={onStatusChange} />
      );
    case "client_credentials":
      return <ClientCredentials onStatusChange={onStatusChange} />;
    case "urn:ietf:params:oauth:grant-type:device_code":
      return <DeviceCode onStatusChange={onStatusChange} />;
    default:
      return <p>There is nothing here</p>;
  }
};

type AuthenticationFlowProps = {
  client?: Client;
  defaultValue?: SelectOption;
  onStatusChange?: (status: boolean) => void;
};

export function AuthenticationFlow(props: Readonly<AuthenticationFlowProps>) {
  const { client, defaultValue, onStatusChange } = props;
  const options = [
    { id: "authorization_code", name: "Authorization Code" },
    { id: "client_credentials", name: "Client Credentials" },
    { id: "urn:ietf:params:oauth:grant-type:device_code", name: "Device Code" },
  ];
  const defaultOption = defaultValue ?? options[0];
  const [selectedGrantType, setSelectedGrantType] = useState(defaultOption);

  const handleGrantTypeChange = (grantType: { id: string; name: string }) => {
    onStatusChange?.(false);
    setSelectedGrantType(grantType);
  };

  return (
    <>
      <Field>
        <Label>Authentication Flow</Label>
        <Description>A little description.</Description>
        <Select
          name="grant_type"
          defaultValue={defaultOption}
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
        client={client}
        onStatusChange={onStatusChange}
        grantType={selectedGrantType.id as GrantType}
      />
    </>
  );
}
