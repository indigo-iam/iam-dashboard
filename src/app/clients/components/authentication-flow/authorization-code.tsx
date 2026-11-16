// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Description } from "@/components/description";
import { Field } from "@/components/field";
import { Label } from "@/components/label";
import { InputList } from "@/components/inputs";
import { useEffect } from "react";

type AuthorizationCodeProps = {
  redirectUris: string[];
  postLogoutRedirectUris: string[];
  onStatusChange?: (status: boolean) => void;
};

export default function AuthorizationCode(
  props: Readonly<AuthorizationCodeProps>
) {
  const { redirectUris, postLogoutRedirectUris, onStatusChange } = props;
  const handleRedirectURIChange = (items: string[]) => {
    onStatusChange?.(items.length > 0);
  };

  useEffect(() => {
    if (redirectUris.length > 0) {
      onStatusChange?.(true);
    }
  });

  return (
    <>
      <Field>
        <Label>Redirect URIs</Label>
        <InputList
          defaultValue={redirectUris}
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
      <Field>
        <Label>Post Logout Redirect URIs</Label>
        <InputList
          defaultValue={postLogoutRedirectUris}
          name="post_logout_redirect_uris"
          type="url"
          placeholder="https://app.example.com/logout"
          onChange={handleRedirectURIChange}
        />
        <Description>
          List of Post Logout Redirect URIs for this client.
        </Description>
      </Field>
    </>
  );
}
