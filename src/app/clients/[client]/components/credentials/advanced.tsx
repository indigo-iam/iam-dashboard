// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  Description,
  Field,
  Label,
  Select,
  SelectOption,
} from "@/components/form";
import { Info } from "@/components/info";
import { CodeChallengeMethod } from "@/models/client";

type PkceProps = {
  name: string;
  codeChallengeMethod: CodeChallengeMethod;
};

function Pkce(props: Readonly<PkceProps>) {
  const { name, codeChallengeMethod } = props;

  const options = [
    { id: "none", name: "No code challenge" },
    { id: "optional", name: "Optional" },
    { id: "plain", name: "Plain code challenge" },
    { id: "S256", name: "SHA-256 hash algorithm" },
  ];

  const defaultValue =
    options.find(o => o.id === codeChallengeMethod) ?? options[0];

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
  codeChallengeMethod: CodeChallengeMethod;
};

export function Advanced(props: Readonly<AdvancedProps>) {
  const { codeChallengeMethod } = props;

  return (
    <div className="flex flex-col lg:gap-8 pt-4 lg:flex-row">
      <div className="w-full space-y-2 lg:w-1/3">
        <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-100">
          Advanced
        </h5>
      </div>
      <div className="w-full space-y-4 lg:w-2/3">
        <Field>
          <Label>
            <div className="flex gap-1">
              Proof Key for Code Exchange (PKCE) challenge method
              <Info>
                PKCE is an extension to the Authorization Code flow to prevent
                CSRF and authorization code injection attacks. PKCE is
                recommended even if a client is using a client secret or other
                form of client authentication like private_key_jwt.
              </Info>
            </div>
          </Label>
          <Pkce
            name="code_challenge_method"
            codeChallengeMethod={codeChallengeMethod}
          />
          <Description>
            <span className="font-semibold">None</span>: Code challenge is
            rejected if provided.
            <br />
            <span className="font-semibold">Optional</span>: Both plain and S256
            code challenges are accepted but not required.
            <br />
            <span className="font-semibold">Plain code challenge</span>: Code
            verifier is directly sent as code challenge without hashing.
            <br />
            <span className="font-semibold">SHA-256</span>: Securely hashes the
            code verifier with SHA-256 before sending it (recommended).
          </Description>
        </Field>
      </div>
    </div>
  );
}
