// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Field, Label, Select, SelectOption } from "@/components/form";
import { Client } from "@/models/client";

type PkceProps = {
  name: string;
  client: Client;
};

function Pkce(props: Readonly<PkceProps>) {
  const { name, client } = props;
  const { code_challenge_method } = client;
  const options = [
    { id: "none", name: "No code challenge" },
    { id: "plain", name: "Plain code challenge" },
    { id: "S256", name: "SHA-256 hash algorithm" },
  ];
  const defaultValue =
    options.find(o => o.id === code_challenge_method) ?? options[0];

  return (
    <Select name={name} defaultValue={defaultValue}>
      {options.map(o => (
        <SelectOption key={o.id} value={o}>
          {o.name}
        </SelectOption>
      ))}
    </Select>
  );
}

type AdvancedProps = {
  client: Client;
};

export function Advanced(props: Readonly<AdvancedProps>) {
  const { client } = props;

  return (
    <div className="flex flex-col gap-8 pt-4 lg:flex-row">
      <div className="w-full space-y-2 lg:w-1/3">
        <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-100">
          Advanced
        </h5>
        <p className="text-sm font-light">
          PKCE is an extension to the Authorization Code flow to prevent CSRF
          and authorization code injection attacks. PKCE is recommended even if
          a client is using a client secret or other form of client
          authentication like private_key_jwt.
        </p>
      </div>
      <div className="w-full space-y-4 lg:w-2/3">
        <Field className="flex-wrap">
          <Label>Proof Key for Code Exchange (PKCE) challenge method</Label>
          <Pkce name="code_challenge_method" client={client} />
        </Field>
      </div>
    </div>
  );
}
