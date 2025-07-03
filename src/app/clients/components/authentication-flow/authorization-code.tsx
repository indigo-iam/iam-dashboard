// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Description, Field, Label } from "@/components/form";
import { InputList } from "@/components/inputs";
import { Client } from "@/models/client";
import { useEffect } from "react";

type AuthorizationCodeProps = {
  client?: Client;
  onStatusChange?: (status: boolean) => void;
};

export default function AuthorizationCode(
  props: Readonly<AuthorizationCodeProps>
) {
  const { client, onStatusChange } = props;
  const redirect_uris = client?.redirect_uris ?? [];
  const handleRedirectURIChange = (items: string[]) => {
    onStatusChange?.(items.length > 0);
  };

  useEffect(() => {
    if (redirect_uris.length > 0) {
      onStatusChange?.(true);
    }
  });

  return (
    <Field>
      <Label data-required>Redirect URIs</Label>
      <Description>
        At least a valid Redirect URI is required when Authorization Code is
        selected.
      </Description>
      <InputList
        originalItems={redirect_uris}
        name="redirect_uris"
        type="url"
        placeholder="https://app.example.com/callback"
        onChange={handleRedirectURIChange}
        required
      />
    </Field>
  );
}
