// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { Field, Label, Description } from "@/components/form";
import { Info } from "@/components/info";
import { Select, Option } from "@/components/select";
import { GrantType } from "@/models/openid-configuration";
import AuthorizationCode from "./authorization-code";
import ClientCredentials from "./client-credentials";
import DeviceCode from "./device-code";

type AuthenticationFlowSettingsProps = {
  grantType: GrantType;
  redirectUris: string[];
  onStatusChange?: (status: boolean) => void;
};

const AuthenticationFlowSettings = (
  props: Readonly<AuthenticationFlowSettingsProps>
) => {
  const { redirectUris, grantType, onStatusChange } = props;
  switch (grantType) {
    case "authorization_code":
      return (
        <AuthorizationCode
          redirectUris={redirectUris}
          onStatusChange={onStatusChange}
        />
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
  redirectUris: string[];
  defaultValue?: string;
  onStatusChange?: (status: boolean) => void;
};

const descriptions = new Map([
  [
    "authorization_code",
    "The Authorization Code grant type is used by confidential and public clients to exchange an authorization code for an access token. It is the most common grant type for web applications.",
  ],
  [
    "client_credentials",
    "The Client Credentials grant type is the simplest grant type for client authentication.",
  ],
  [
    "urn:ietf:params:oauth:grant-type:device_code",
    "The Device Code grant type is used for devices with limited access to a web browser.",
  ],
]);

export function AuthenticationFlow(props: Readonly<AuthenticationFlowProps>) {
  const { redirectUris, defaultValue, onStatusChange } = props;
  const options = [
    { id: "authorization_code", name: "Authorization Code" },
    { id: "client_credentials", name: "Client Credentials" },
    { id: "urn:ietf:params:oauth:grant-type:device_code", name: "Device Code" },
  ];
  const defaultOption = defaultValue ?? options[0].id;
  const [selectedGrantType, setSelectedGrantType] = useState(defaultOption);

  function handleGrantTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onStatusChange?.(false);
    setSelectedGrantType(e.target.value);
  }

  const description = descriptions.get(selectedGrantType);

  return (
    <div className="space-y-2">
      <Field>
        <Label>
          <div className="flex items-center gap-1">
            <span>Default authorization grant</span>
            <Info>Select the default authorization grant for this client.</Info>
          </div>
        </Label>
        <Select
          name="grant_type"
          defaultValue={defaultOption}
          onChange={handleGrantTypeChange}
        >
          {options.map(option => (
            <Option key={option.id} value={option.id}>
              {option.name}
            </Option>
          ))}
        </Select>
        <Description>{description}</Description>
      </Field>
      <AuthenticationFlowSettings
        redirectUris={redirectUris}
        onStatusChange={onStatusChange}
        grantType={selectedGrantType as GrantType}
      />
    </div>
  );
}
