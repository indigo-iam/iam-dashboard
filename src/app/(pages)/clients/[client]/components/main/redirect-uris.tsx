// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { InputList } from "@/components/inputs";

type RedirectUrisProps = {
  redirect_uris?: string[];
};

export default function RedirectUris(props: Readonly<RedirectUrisProps>) {
  const { redirect_uris } = props;
  return (
    <InputList
      id="redirect-uris-input"
      name="redirect_uris"
      placeholder="http://example.com"
      originalItems={redirect_uris ?? []}
      type="url"
    />
  );
}
