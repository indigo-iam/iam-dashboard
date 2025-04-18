// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Page, Panel, Section } from "@/components/layout";
import { fetchScopePolicies } from "@/services/scope-policies";
import { AddPolicyButton, PoliciesTable } from "./components";

export default async function Policies() {
  const policies = await fetchScopePolicies();
  return (
    <Page title="Scope Policies">
      <Panel>
        <p className="font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in
          accumsan leo. Suspendisse potenti. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas.
          Vestibulum a metus sed ipsum sodales laoreet ac efficitur mi. Integer
          tempus sit amet enim eget consequat. Phasellus sit amet fringilla mi,
          id hendrerit quam.
        </p>
        <Section>
          <AddPolicyButton />
          <PoliciesTable policies={policies} />
        </Section>
      </Panel>
    </Page>
  );
}
