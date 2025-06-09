// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Field, Description, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Textarea } from "@/components/textarea";
import { ChangeEvent, useState } from "react";

type PrivateKeyJwtProps = {
  onStatusChange?: (status: boolean) => void;
};

export default function PrivateKeyJwt(props: Readonly<PrivateKeyJwtProps>) {
  const { onStatusChange } = props;
  const [jwkMethod, setJwkMethod] = useState<"uri" | "value">("uri");

  const changeJwkMethod = (method: "uri" | "value") => {
    setJwkMethod(method);
    onStatusChange?.(false);
  };

  const handleJwkChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onStatusChange?.(e.currentTarget.value.length > 0);
  };

  return (
    <Field>
      <Label data-required>Public Key Set</Label>
      <Description>
        The JSON Web Keyset for this client. Used for client authentication and
        token encryption. Keys can be provided by reference or by value.
      </Description>
      <div className="flex flex-row gap-2">
        <label htmlFor="jwk-radio-uri">By URI</label>
        <input
          type="radio"
          name="jwk-method-selector"
          id="jwk-radio-uri"
          checked={jwkMethod === "uri"}
          className="my-auto"
          onChange={() => changeJwkMethod("uri")}
        />
        <label htmlFor="jwk-radio-value">By Value</label>
        <input
          type="radio"
          name="jwk-method-selector"
          id="jwk-radio-value"
          checked={jwkMethod === "value"}
          className="my-auto"
          onChange={() => changeJwkMethod("value")}
        />
      </div>
      {jwkMethod === "uri" ? (
        <Input
          name="jwk_uri"
          type="uri"
          title="JSON Web Keyset URI"
          placeholder="https://app.example.org/jwk"
          onChange={handleJwkChange}
          required
        />
      ) : (
        <Textarea
          name="jwk"
          placeholder={'{"keys": []}'}
          onChange={handleJwkChange}
          required
        />
      )}
    </Field>
  );
}
