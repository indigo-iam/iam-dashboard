// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Field, Label } from "@/components/form";
import { InputList } from "@/components/inputs";
import { Description } from "@headlessui/react";

type AuthorizationCodeProps = {
  onStatusChange: (status: boolean) => void;
};

export default function AuthorizationCode(
  props: Readonly<AuthorizationCodeProps>
) {
  const { onStatusChange } = props;
  const handleRedirectURIChange = (items: string[]) => {
    onStatusChange(items.length > 0);
  };

  return (
    <Field className="flex flex-col">
      <Label data-required>Redirect URIs</Label>
      <Description className="text-primary/60 dark:text-secondary/60 p-1 text-xs">
        At least a valid Redirect URI is required when Authorization Code is
        selected.
      </Description>
      <InputList
        originalItems={[]}
        name="redirect_uris"
        type="url"
        placeholder="https://app.exchange.com/callback"
        onChange={handleRedirectURIChange}
        required
      />
    </Field>
  );
}
