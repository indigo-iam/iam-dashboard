// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Description, Field, Label } from "@/components/form";
import { InputList } from "@/components/inputs";
import { useEffect } from "react";

type AuthorizationCodeProps = {
  redirectUris: string[];
  onStatusChange?: (status: boolean) => void;
};

export default function AuthorizationCode(
  props: Readonly<AuthorizationCodeProps>
) {
  const { redirectUris, onStatusChange } = props;
  const handleRedirectURIChange = (items: string[]) => {
    onStatusChange?.(items.length > 0);
  };

  useEffect(() => {
    if (redirectUris.length > 0) {
      onStatusChange?.(true);
    }
  });

  return (
    <Field>
      <Label data-required>Redirect URIs</Label>
      <InputList
        originalItems={redirectUris}
        name="redirect_uris"
        type="url"
        placeholder="https://app.example.com/callback"
        onChange={handleRedirectURIChange}
        required
      />
      <Description>
        At least a valid Redirect URI is required when Authorization Code is
        selected.
      </Description>
    </Field>
  );
}
