// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { AuthenticationFlow } from "@/app/clients/components";
import { Client } from "@/models/client";

const grantTypes = [
  { id: "none", name: "None" },
  { id: "authorization_code", name: "Authorization Code" },
  { id: "client_credentials", name: "Client Credentials" },
  { id: "urn:ietf:params:oauth:grant-type:device_code", name: "Device Code" },
];

function defaultGrantType(client: Client) {
  if (client.grant_types.includes("authorization_code")) {
    return grantTypes[1];
  } else if (client.grant_types.includes("client_credentials")) {
    return grantTypes[2];
  } else if (
    client.grant_types.includes("urn:ietf:params:oauth:grant-type:device_code")
  ) {
    return grantTypes[3];
  } else {
    return grantTypes[0];
  }
}

type MainGrantTypesProps = {
  client: Client;
  onAuthGrantChange: (newStatus: boolean) => void;
};

export function MainGrantTypes(props: Readonly<MainGrantTypesProps>) {
  const { client, onAuthGrantChange } = props;
  return (
    <div className="flex flex-col gap-4 pb-4 lg:flex-row lg:gap-8">
      <div className="w-full space-y-4 text-sm lg:w-1/3">
        <div className="lg:space-y-2">
          <p className="font-semibold text-gray-600 dark:text-gray-100">
            Authorization grant
          </p>
          <p className="font-light">
            An authorization grant is a credential representing the resource
            owner&apos;s authorization (to access its protected resources) used
            by the client to obtain an access token.
          </p>
        </div>
      </div>
      <div className="lg:w-2/3">
        <AuthenticationFlow
          client={client}
          defaultValue={defaultGrantType(client)}
          onStatusChange={onAuthGrantChange}
        />
      </div>
    </div>
  );
}
