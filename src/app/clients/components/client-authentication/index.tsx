// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Select, SelectOption } from "@/components/form";
import { useEffect, useState } from "react";
import ClientSecretJwt from "./client-secret-jwt";
import PrivateKeyJwt from "./private-key-jwt";
import { RegenerateClientSecret } from "./regenerate-client-secret";
import { TOKEN_ENDPOINT_AUTH_VALUES } from "./utils";

type ClientAuthenticationSettingsProps = {
  authMethod: string;
  clientId: string;
  showRegenerateSecret?: boolean;
  onStatusChange?: (status: boolean) => void;
};

function ClientAuthenticationSettings(
  props: Readonly<ClientAuthenticationSettingsProps>
) {
  const { authMethod, showRegenerateSecret, onStatusChange, clientId } = props;
  switch (authMethod) {
    case "client_secret_basic":
      if (showRegenerateSecret) {
        return <RegenerateClientSecret clientId={clientId} />;
      }
      return null;
    case "client_secret_post":
      if (showRegenerateSecret) {
        return <RegenerateClientSecret clientId={clientId} />;
      }
      return null;
    case "client_secret_jwt":
      if (showRegenerateSecret) {
        return (
          <>
            <RegenerateClientSecret clientId={clientId} />
            <ClientSecretJwt onStatusChange={onStatusChange} />
          </>
        );
      }
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
  name: string;
  defaultValue?: SelectOption;
  showRegenerateClientSecret?: boolean;
  clientId: string;
  onStatusChange?: (status: boolean) => void;
};

export function ClientAuthentication(
  props: Readonly<ClientAuthenticationProps>
) {
  const {
    name,
    defaultValue,
    showRegenerateClientSecret,
    onStatusChange,
    clientId,
  } = props;

  const [authMethod, setAuthMethod] = useState(defaultValue);

  // Temporary workaround to make carousel go to next page
  useEffect(() => {
    onStatusChange?.(true);
  });

  const handleAuthMethodChange = (authMethod: { id: string; name: string }) => {
    onStatusChange?.(true); // change me
    setAuthMethod(authMethod);
  };

  return (
    <div className="flex flex-col gap-4">
      <Select
        name={name}
        onChange={handleAuthMethodChange}
        defaultValue={defaultValue ?? TOKEN_ENDPOINT_AUTH_VALUES[0]}
      >
        {TOKEN_ENDPOINT_AUTH_VALUES.map(method => (
          <SelectOption key={method.id} value={method}>
            {method.name}
          </SelectOption>
        ))}
      </Select>
      {authMethod && (
        <ClientAuthenticationSettings
          authMethod={authMethod.id}
          showRegenerateSecret={showRegenerateClientSecret}
          onStatusChange={onStatusChange}
          clientId={clientId}
        />
      )}
    </div>
  );
}
