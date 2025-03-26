// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { FormSection } from "@/components/form";
import { Input } from "@/components/inputs";
import { TabPanel } from "@/components/tabs";
import { ClientOtherInfo } from "@/models/client";

interface OtherInfoProps extends ClientOtherInfo {}

export default function OtherInfo(props: Readonly<OtherInfoProps>) {
  const { client_uri, tos_uri, policy_uri } = props;
  return (
    <TabPanel unmount={false}>
      <FormSection htmlFor="client-uri-input" title="Home page">
        <Input
          id="client-uri-input"
          name="client_uri"
          placeholder={"https://app.example.org"}
          defaultValue={client_uri}
        />
        <p className="mt-2 text-secondary-400">
          URL for the client&apos; s home page, which will be displayed to the
          user in the consent page.
        </p>
      </FormSection>
      <FormSection htmlFor="tos-uri-input" title="Terms of Service">
        <Input
          id="tos-uri-input"
          name="tos_uri"
          placeholder={"https://app.example.org/tos.html"}
          defaultValue={tos_uri}
        />
        <p className="mt-2 text-secondary-400">
          URL that points to the Terms of Service for this client, will be
          displayed to the user in the consent page.
        </p>
      </FormSection>
      <FormSection htmlFor="policy-uri-input" title="Policy Statement">
        <Input
          id="policy-uri-input"
          name="policy_uri"
          placeholder={"https://app.example.org/policy.html"}
          defaultValue={policy_uri}
        />
        <p className="mt-2 text-secondary-400">
          URL that points to the Policy statement for this client, will be
          displayed to the user in the consent page.
        </p>
      </FormSection>
    </TabPanel>
  );
}
